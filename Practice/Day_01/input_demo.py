import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from input_utils import safe_input


def main():
    name = safe_input("Enter your name: ")
    age = safe_input("Enter your age: ")
    print(f"Hello {name}! You are {age} years old.")


if __name__ == "__main__":
    main()
