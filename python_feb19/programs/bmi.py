import math

# BMI = 703 * ( lbs / (inches ^ 2))
def bmi(weight, height):
    return 703 * (weight / (height ** 2))

def bmi_classification(bmi):
    if bmi < 18.5:
        return "underweight"
    elif bmi < 25:
        return "normal"
    elif bmi < 30:
        return "overweight"
    else:
        return "obese"

weight = float(input("Enter your weight in lbs: "))
heightFt = float(input("Enter your height in feet: "))
heightIn = float(input("Enter the remaining height in inches: "))
# height = ( height in feet * 12 ) + extra inches
height = (heightFt * 12) + heightIn

your_bmi = bmi(weight, height)
print("Your BMI is:", math.floor(your_bmi))
print("You are", bmi_classification(your_bmi))