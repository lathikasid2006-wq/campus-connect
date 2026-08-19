import sys
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_ai_team_matches(project_skills, student_profiles):
    """
    Computes Scikit-Learn TF-IDF vectorization and Cosine Similarity scores
    between target project skill requirements and student skill profile vectors.
    """
    if not project_skills or not student_profiles:
        return []

    # Prepare document text corpus
    # Document 0 is the project skill requirement string
    project_doc = " ".join(project_skills)
    student_docs = [" ".join(student.get("skills", [])) for student in student_profiles]
    
    corpus = [project_doc] + student_docs

    # Initialize Scikit-Learn TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(token_pattern=r"(?u)\b[\w+#\.\-]+\b")
    
    try:
        tfidf_matrix = vectorizer.fit_transform(corpus)
    except Exception as e:
        # Fallback if vectorizer encounters single token
        vectorizer = TfidfVectorizer(token_pattern=r"\S+")
        tfidf_matrix = vectorizer.fit_transform(corpus)

    # Compute Cosine Similarity between Project Vector (Index 0) and Student Vectors (Index 1..N)
    project_vector = tfidf_matrix[0:1]
    student_vectors = tfidf_matrix[1:]

    similarity_scores = cosine_similarity(project_vector, student_vectors)[0]

    # Build response with match percentages
    ranked_students = []
    for idx, student in enumerate(student_profiles):
        raw_score = float(similarity_scores[idx])
        
        # Calculate matching skills intersection
        p_set = set([s.lower() for s in project_skills])
        s_set = set([s.lower() for s in student.get("skills", [])])
        matching_skills = [s for s in student.get("skills", []) if s.lower() in p_set]

        # Calibrate baseline percentage for high precision presentation
        percentage = int(np.round(raw_score * 100 * 1.5 + (len(matching_skills) * 15)))
        if len(matching_skills) == 0:
            percentage = max(10, int(np.round(raw_score * 100)))
        percentage = min(98, max(percentage, 25 if len(matching_skills) > 0 else 10))

        student_copy = dict(student)
        student_copy["matchScore"] = percentage
        student_copy["matchingSkills"] = matching_skills
        ranked_students.append(student_copy)

    # Sort descending by match score
    ranked_students.sort(key=lambda x: x["matchScore"], reverse=True)
    return ranked_students

if __name__ == "__main__":
    try:
        if len(sys.argv) > 1:
            input_data = json.loads(sys.argv[1])
        else:
            input_data = json.loads(sys.stdin.read())

        project_skills = input_data.get("projectSkills", [])
        student_profiles = input_data.get("students", [])

        results = calculate_ai_team_matches(project_skills, student_profiles)
        print(json.dumps({"success": True, "rankedStudents": results}))
    except Exception as err:
        print(json.dumps({"success": False, "error": str(err)}))
