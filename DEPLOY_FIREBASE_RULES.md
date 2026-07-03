# Deploy Firebase Rules Manually

Since Firebase CLI is not installed, follow these steps to deploy the rules from Firebase Console:

## Step 1: Deploy Firestore Rules

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: **lakshanaatelier**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top
5. Delete all existing rules
6. Copy and paste the content from `firestore.rules` file
7. Click **Publish** button

## Step 2: Deploy Storage Rules

1. In Firebase Console, click **Storage** in the left sidebar
2. Click the **Rules** tab at the top
3. Delete all existing rules
4. Copy and paste the content from `storage.rules` file
5. Click **Publish** button

## Step 3: Verify Rules are Active

1. Go back to Firestore Database
2. You should see: "Rules published successfully"
3. Go to Storage
4. You should see: "Rules published successfully"

## Step 4: Test the Application

After deploying rules, test:
1. Booking form submission (should work without errors)
2. Admin login
3. Gallery upload

---

## Firestore Rules Content

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated admin
    function isAuthenticatedAdmin() {
      return request.auth != null;
    }
    
    // Admins collection - allow authenticated users to read their own admin doc
    match /admins/{adminId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Customers collection - allow public creation, admin read/write
    match /customers/{customerId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Appointments collection - allow public creation, admin read/write
    match /appointments/{appointmentId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Services collection - public read, admin write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Gallery collection - public read, admin write
    match /gallery/{galleryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Testimonials collection - public read, admin write
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Contact messages collection - public create, admin read/write
    match /contact_messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Storage Rules Content

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if file is an image
    function isImage() {
      return request.resource.contentType.matches('image/.*');
    }
    
    // Helper function to check if file is under 10MB
    function isUnder10MB() {
      return request.resource.size < 10 * 1024 * 1024;
    }
    
    // Gallery images - admins can upload, everyone can read
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isUnder10MB();
    }
    
    // Service images - admins can upload, everyone can read
    match /services/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isUnder10MB();
    }
    
    // Testimonial images - admins can upload, everyone can read
    match /testimonials/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isUnder10MB();
    }
    
    // Profile images - users can upload their own
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isUnder10MB();
    }
  }
}
```
