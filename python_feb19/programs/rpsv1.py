import random

def get_user_choice():
    return input("Enter your choice: ").lower()

def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

def determine_winner(user, computer):
    if user == computer:
        return "It's a tie!"
    if user == "rock":
        return "You win!" if computer == "scissors" else "You lose!"
    if user == "paper":
        return "You win!" if computer == "rock" else "You lose!"
    if user == "scissors":
        return "You win!" if computer == "paper" else "You lose!"

while True:
    user = get_user_choice()
    computer = get_computer_choice()
    print("Computer chose:", computer)
    print(determine_winner(user, computer))
    if input("Play again? (y/n): ").lower() != "y":
        break