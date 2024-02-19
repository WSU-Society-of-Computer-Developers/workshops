import random
from abc import ABC, abstractmethod 

class Player:
    def __init__(self, name):
        self.name = name
        self._score = 0

    @property
    def choices(self):
        return ["rock", "paper", "scissors"]

    @property
    def score(self):
        return self._score

    @abstractmethod
    def get_choice(self):
        pass

    def win(self):
        self._score += 1
        print(self.name, "wins!")
    

class Human(Player):
    def __init__(self, name):
        super().__init__(name)

    def get_choice(self):
        return input("Enter your choice: ").lower()

class Computer(Player):
    def __init__(self):
        super().__init__("Computer")

    def get_choice(self):
        return random.choice(self.choices)


class Game:
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2

    def determine_winner(self, p1_input, p2_input):
        if p1_input == p2_input:
            print("It's a tie!")
        elif p1_input == "rock":
            self.p1.win() if p2_input == "scissors" else self.p2.win()
        elif p1_input == "paper":
            self.p1.win() if p2_input == "rock" else self.p2.win()
        elif p1_input == "scissors":
            self.p1.win() if p2_input == "paper" else self.p2.win()
    
    def play(self):
        while True:
            p1_input = self.p1.get_choice()
            p2_input = self.p2.get_choice()
            print(self.p2.name, "choses:", p2_input)
            self.determine_winner(p1_input, p2_input)
            if input("Play again? (y/n): ").lower() != "y":
                print(self.p1.name, "score:", self.p1.score)
                print(self.p2.name, "score:", self.p2.score)
                break


if __name__ == "__main__":
    player1 = Human("Zavaar")
    player2 = Computer()
    game = Game(player1, player2)
    game.play()