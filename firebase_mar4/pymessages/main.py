import os
import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore


authFile = os.getcwd()+"\\auth.json"

# get your credentials json file by following the guide.pdf

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = authFile
cred = credentials.Certificate(authFile)
firebase_admin.initialize_app(cred)
# First make sure to create a firestore database, then a collection.

db = firestore.Client()
def main():
    user = input("Please enter a username: ")
    while True:
        print(f"Welcome, {user}.")
        collection = db.collection("messages")
        choice = int(input("1. View all messages\n2. Create a message\n3. Edit/Delete a message\n4. Exit\n"))
        
        if choice == 1: # shows all messages (READ)
            print("Getting ALL messages...")
            msgs = collection.get()
            for msg in msgs:
                dictMsg = msg.to_dict()
                print(f"{dictMsg['user']}: {dictMsg['content']}")
                
        elif choice == 2: # creates a message (CREATE)
            msg = input("Enter a message: ")
            collection.add({"content": msg, "user": user})
            print("Your message has been saved.")
            
        elif choice == 3: # updates an existing message (UPDATE/DELETE)
            myMsgs = collection.where("user", "==", user).get() # filter messages based on username
            for i in range(len(myMsgs)): # show the user their options to edit
                dictMsg = myMsgs[i].to_dict()
                print(f"{i+1}. {dictMsg['content']}")
            selection = int(input(f"Which message would you like to select [1-{len(myMsgs)}]: "))
            selectedMsgID = myMsgs[selection-1].id
            targetDocument = collection.document(selectedMsgID)
            newMsg = input("New message (leave blank to delete): ")
            if newMsg:
                targetDocument.update({"content": newMsg})
                print(f"Edited message: {selectedMsgID}")
            else:
                targetDocument.delete()
                print(f"Deleted message: {selectedMsgID}")
                
        elif choice == 4: # exits the program
            break
        print("#"*30) # print a border between each interaction
            
    print("Goodbye.")
    
if __name__ == "__main__":
    main()