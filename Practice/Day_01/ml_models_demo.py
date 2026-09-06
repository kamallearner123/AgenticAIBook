import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.cluster import KMeans
from transformers import pipeline

def run_ml_demos():
    print("==============================================")
    print("   TYPES OF MACHINE LEARNING MODELS DEMO      ")
    print("==============================================\n")

    # ---------------------------------------------------------
    # 1. SUPERVISED LEARNING (Learning by Example)
    # ---------------------------------------------------------
    print("--- 1. Supervised Learning (Regression) ---")
    print("Goal: Learn the relationship between square footage and house price.")
    # Features (X) and Labels (y)
    X_train = np.array([[1], [2], [3], [4]]) # E.g., square footage (in 1000s sq ft)
    y_train = np.array([200, 400, 600, 800]) # E.g., house prices (in $1000s)

    model = LinearRegression()
    model.fit(X_train, y_train) # The model learns the mapping
    
    new_size = 5
    prediction = model.predict([[new_size]])
    print(f"Data: {X_train.flatten().tolist()} -> {y_train.tolist()}")
    print(f"Prediction: For a size of {new_size}k sq ft, predicted price is ${prediction[0]:.2f}k\n")


    # ---------------------------------------------------------
    # 2. UNSUPERVISED LEARNING (Finding Hidden Patterns)
    # ---------------------------------------------------------
    print("--- 2. Unsupervised Learning (Clustering) ---")
    print("Goal: Group similar data points together without any labels.")
    # Data without any answers/labels
    X_unlabeled = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])

    kmeans = KMeans(n_clusters=2, random_state=0, n_init="auto")
    kmeans.fit(X_unlabeled) # The model finds natural groupings
    print(f"Data points:\n{X_unlabeled}")
    print(f"Cluster assignments: {kmeans.labels_}\n")


    # ---------------------------------------------------------
    # 3. REINFORCEMENT LEARNING (Conceptual)
    # ---------------------------------------------------------
    print("--- 3. Reinforcement Learning (Learning by Trial and Error) ---")
    print("Goal: An agent takes actions to maximize its reward.")
    q_table = {"state_A": {"action_1": 0.0, "action_2": 0.0}}
    print(f"Initial Q-Table (Policy): {q_table}")
    
    reward = 10 
    learning_rate = 0.1
    # Agent takes action_1, gets a positive reward, updates its policy
    q_table["state_A"]["action_1"] += learning_rate * reward 
    
    print(f"Agent took 'action_1' and received reward: {reward}")
    print(f"Updated Q-Table (Policy): {q_table}\n")


    # ---------------------------------------------------------
    # 4. GENERATIVE AI / LLMs
    # ---------------------------------------------------------
    print("--- 4. Generative AI (LLMs) ---")
    print("Goal: Generate novel text sequences based on a prompt (Next-token prediction).")
    print("Loading lightweight GPT-2 model (this may take a few seconds on first run)...")
    
    # We use a small model (gpt2) for demonstration purposes so it runs quickly locally
    try:
        generator = pipeline('text-generation', model='gpt2')
        prompt = "Machine learning is"
        print(f"Prompt: '{prompt}'")
        
        response = generator(prompt, max_length=20, num_return_sequences=1, truncation=True)
        print(f"LLM Generation: {response[0]['generated_text']}\n")
    except Exception as e:
        print(f"Failed to run LLM locally. Ensure you have PyTorch/TensorFlow installed. Error: {e}")

if __name__ == "__main__":
    run_ml_demos()
