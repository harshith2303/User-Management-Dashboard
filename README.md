First created project Structure:

user-management-dashboard/
│── public/
│── src/
│   ├── components/
│   │   ├── UserTable.jsx       # Displays list of users with pagination, sort, search
│   │   ├── UserForm.jsx        # Add/Edit user form
│   │   ├── FilterPopup.jsx     # Popup for filtering users
│   │   ├── Pagination.jsx      # Pagination controls
│   │   └── SearchBar.jsx       # Search input
│   │
│   ├── pages/
│   │   ├── UsersPage.jsx       # Main page with table + controls
│   │   ├── AddUserPage.jsx     # Page for adding user
│   │   └── EditUserPage.jsx    # Page for editing user
│   │
│   ├── services/
│   │   └── api.js              # Axios instance & API calls (CRUD functions)
│   ├── App.js                  # Routes & main layout
│   └── index.js                # Entry point
└── package.json

git commands used are:

git init
git add .
git commit -m"committed"
git remote add origin https://github.com/your-username/user-management-app.git
git branch -M main
git push -u origin main



