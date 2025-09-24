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

git commands used are and git repo (https://github.com/harshith2303/User-Management-Dashboard)

git init
git add .
git commit -m"committed"
git remote add origin https://github.com/harshith2303/User-Management-Dashboard.git
git branch -M main
git push -u origin main



Vercel Deployment link: (https://user-management-dashboard-gamma-mocha.vercel.app/)


SORting:

If you click on id, name, username, email, companyName sorting takes place assending and descending.

As there is no department in the Backend Api. So, instead of department added CompanyName.

