# Authority Roles Feature - Implementation Tasks

## Implementation Plan

- [x] 1. Create authority roles utility module


  - Create `web-kartavya/src/utils/authorityRoles.js` with role list and helper functions
  - Export AUTHORITY_ROLES array with 16 predefined roles
  - Export getRoleIcon function for role-specific icons
  - _Requirements: 2.1, 3.1_




- [ ] 2. Update authentication system
  - [ ] 2.1 Update user data model in auth.js
    - Add authorityRole field to user object structure


    - Update default admin account with authorityRole
    - _Requirements: 3.1, 6.1_
  
  - [ ] 2.2 Update loginUser function
    - Add authorityRole parameter to loginUser function


    - Validate authority role when role is 'admin'
    - Store authorityRole in user session

    - Update users array with selected role


    - _Requirements: 2.3, 2.4, 3.2_
  
  - [x] 2.3 Update getCurrentUser function


    - Ensure authorityRole is included in returned user object
    - Handle backward compatibility for users without roles
    - _Requirements: 6.2_



- [ ] 3. Update Login page component
  - [ ] 3.1 Add authority role state management
    - Add authorityRole state variable
    - Add setAuthorityRole state setter
    - _Requirements: 2.1_


  
  - [ ] 3.2 Update role selection buttons
    - Change "Admin" button text to "Authority"

    - Update button styling to maintain consistency


    - _Requirements: 1.1_
  
  - [x] 3.3 Add authority role dropdown


    - Create dropdown component after role selection
    - Show dropdown only when Authority is selected
    - Populate dropdown with AUTHORITY_ROLES
    - Add role icons to dropdown options

    - Make dropdown required for authority login


    - _Requirements: 2.1, 2.2, 3.1_
  
  - [x] 3.4 Update form validation


    - Validate authority role is selected before login
    - Show error message if role not selected
    - Pass authorityRole to loginUser function
    - _Requirements: 2.4_



- [ ] 4. Update Profile page component
  - [ ] 4.1 Update authority badge display
    - Change "ADMIN" text to "AUTHORITY"


    - Maintain existing badge styling

    - _Requirements: 1.3_
  
  - [ ] 4.2 Add authority role display
    - Show authority role below badge
    - Display role icon with role name

    - Style role display with blue background
    - Handle cases where authorityRole is null
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 5. Update Admin Dashboard component

  - [ ] 5.1 Update dashboard title
    - Change "Admin Dashboard" to "Authority Dashboard"
    - Update page heading text
    - _Requirements: 1.4_
  
  - [ ] 5.2 Add authority role column to user table
    - Add "Authority Role" column header
    - Display authority role for each user
    - Show role icon with role name
    - Handle users without authority roles (show "-")
    - _Requirements: 4.2_

- [ ] 6. Update test credentials documentation
  - Update TEST_CREDENTIALS.md with authority role information
  - Update default admin credentials to show authority role
  - Add examples of different authority roles
  - _Requirements: 6.1_

- [ ] 7. Verify and test implementation
  - [ ] 7.1 Test authority login flow
    - Test login with each authority role
    - Verify role is stored correctly
    - Verify role displays in profile
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ] 7.2 Test backward compatibility
    - Test existing admin account login
    - Verify prompt for role selection
    - Test role persistence across sessions
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ] 7.3 Test UI components
    - Verify "Authority" text appears correctly
    - Verify role dropdown functionality
    - Verify role display in profile
    - Verify role display in dashboard
    - _Requirements: 1.1, 1.3, 1.4, 4.1_
