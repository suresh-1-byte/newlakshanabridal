# 📊 Google Sheets Integration Setup Guide

## **Overview**

This guide will help you set up automatic Google Sheets logging for:
- ✅ **Bookings** - All appointment bookings from website
- ✅ **Enquiries** - All contact form submissions

---

## **Step 1: Create Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "**+ Blank**" to create a new spreadsheet
3. Name it: **"Lakshana Bookings & Enquiries"**

---

## **Step 2: Create Two Sheets**

### **Sheet 1: Bookings**

1. Rename "Sheet1" to "**Bookings**"
2. Add these headers in Row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Booking ID | Customer Name | Phone | Email | Service | Date | Time | Amount | Status | Created At |

### **Sheet 2: Enquiries**

1. Click "**+**" at bottom to add new sheet
2. Name it "**Enquiries**"
3. Add these headers in Row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Name | Phone | Email | Subject | Interested Service | Message | Status | Created At |

---

## **Step 3: Create Google Apps Script**

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this complete script:

```javascript
/**
 * Lakshana Bridal Studio - Bookings & Enquiries Logger
 * Receives data from website and logs to Google Sheets
 */

function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // 'booking' or 'enquiry'
    const rowData = data.data;
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (type === 'booking') {
      logBooking(ss, rowData);
    } else if (type === 'enquiry') {
      logEnquiry(ss, rowData);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function logBooking(ss, data) {
  const sheet = ss.getSheetByName('Bookings');
  
  // Append new row
  sheet.appendRow([
    data['Booking ID'],
    data['Customer Name'],
    data['Phone'],
    data['Email'],
    data['Service'],
    data['Date'],
    data['Time'],
    data['Amount'],
    data['Status'],
    data['Created At']
  ]);
  
  // Format the new row
  const lastRow = sheet.getLastRow();
  
  // Status color coding
  const statusCell = sheet.getRange(lastRow, 9);
  const status = data['Status'].toLowerCase();
  
  if (status === 'pending') {
    statusCell.setBackground('#FEF3C7'); // Yellow
  } else if (status === 'confirmed') {
    statusCell.setBackground('#DBEAFE'); // Blue
  } else if (status === 'completed') {
    statusCell.setBackground('#D1FAE5'); // Green
  } else if (status === 'cancelled') {
    statusCell.setBackground('#FEE2E2'); // Red
  }
  
  // Make status bold
  statusCell.setFontWeight('bold');
  
  Logger.log('✅ Booking logged: ' + data['Booking ID']);
}

function logEnquiry(ss, data) {
  const sheet = ss.getSheetByName('Enquiries');
  
  // Append new row
  sheet.appendRow([
    data['Name'],
    data['Phone'],
    data['Email'],
    data['Subject'],
    data['Interested Service'],
    data['Message'],
    data['Status'],
    data['Created At']
  ]);
  
  // Format the new row
  const lastRow = sheet.getLastRow();
  
  // Status color coding
  const statusCell = sheet.getRange(lastRow, 7);
  const status = data['Status'].toLowerCase();
  
  if (status === 'new') {
    statusCell.setBackground('#DBEAFE'); // Blue
  } else if (status === 'contacted') {
    statusCell.setBackground('#FEF3C7'); // Yellow
  } else if (status === 'completed') {
    statusCell.setBackground('#D1FAE5'); // Green
  }
  
  // Make status bold
  statusCell.setFontWeight('bold');
  
  Logger.log('✅ Enquiry logged: ' + data['Name']);
}

// Test function for bookings
function testBooking() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  logBooking(ss, {
    'Booking ID': 'BK1234567890',
    'Customer Name': 'Test Customer',
    'Phone': '9876543210',
    'Email': 'test@example.com',
    'Service': 'Bridal Makeup',
    'Date': '2025-02-15',
    'Time': '10:00 AM',
    'Amount': 15000,
    'Status': 'pending',
    'Created At': new Date().toISOString()
  });
  Logger.log('✅ Test booking added');
}

// Test function for enquiries
function testEnquiry() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  logEnquiry(ss, {
    'Name': 'Test Enquiry',
    'Phone': '9876543210',
    'Email': 'test@example.com',
    'Subject': 'Test Subject',
    'Interested Service': 'Bridal Makeup',
    'Message': 'This is a test enquiry message',
    'Status': 'new',
    'Created At': new Date().toISOString()
  });
  Logger.log('✅ Test enquiry added');
}
```

4. Click **Save** (💾 icon)
5. Name your project: **"Lakshana Logger"**

---

## **Step 4: Deploy as Web App**

1. Click **Deploy** → **New deployment**
2. Click gear icon ⚙️ → Select "**Web app**"
3. Configuration:
   - **Description**: Lakshana Booking & Enquiry Logger
   - **Execute as**: Me
   - **Who has access**: **Anyone** (Important!)
4. Click **Deploy**
5. **Authorize access:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Lakshana Logger (unsafe)"
   - Click "Allow"
6. **COPY THE WEB APP URL** - It looks like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

---

## **Step 5: Add URL to Environment Variables**

### **For Local Development:**

1. Open `.env` file in project root
2. Add this line:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Save the file

### **For Vercel Production:**

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - **Environments**: Production, Preview, Development
5. Click **Save**
6. **Redeploy** your site

---

## **Step 6: Test the Integration**

### **Test from Apps Script:**

1. In Apps Script editor, select `testBooking` from dropdown
2. Click **Run** (▶️)
3. Check Bookings sheet - should see test row
4. Select `testEnquiry` from dropdown
5. Click **Run** (▶️)
6. Check Enquiries sheet - should see test row

### **Test from Website:**

1. Go to your website: https://www.lakshanaatelier.in
2. **Test Booking:**
   - Scroll to "Book Appointment" section
   - Fill out the form
   - Submit
   - Check Google Sheet → Bookings tab
   - New row should appear automatically!
3. **Test Enquiry:**
   - Scroll to "Contact Us" section
   - Fill out the contact form
   - Submit
   - Check Google Sheet → Enquiries tab
   - New row should appear automatically!

---

## **Step 7: Format Your Sheet (Optional)**

### **Bookings Sheet Formatting:**

1. Select Row 1 (headers)
2. **Format** → **Text** → **Bold**
3. **Format** → **Fill color** → Gold (#C9A96E)
4. **Format** → **Text color** → White
5. Freeze header row: **View** → **Freeze** → **1 row**
6. Auto-resize columns: Select all → **Format** → **Resize columns** → **Fit to data**

### **Enquiries Sheet Formatting:**

Repeat the same steps as above.

---

## **Troubleshooting**

### **Data not appearing in sheet?**

1. **Check console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for messages like "✅ Sent to Google Sheets"
   - Or errors like "❌ Google Sheets error"

2. **Check Apps Script logs:**
   - Open Apps Script editor
   - Click **Executions** (left sidebar)
   - Check if requests are coming through
   - Check for any errors

3. **Check environment variable:**
   - Make sure `VITE_GOOGLE_SCRIPT_URL` is set correctly
   - Redeploy after adding variable

4. **Check script permissions:**
   - Make sure "Who has access" is set to **Anyone**
   - Re-deploy if you changed this

### **CORS errors?**

The script uses `mode: 'no-cors'` which should work. If you see CORS errors:
- Make sure deployment has "Who has access: Anyone"
- Redeploy the Apps Script
- Clear browser cache

### **Data saves to Firebase but not Google Sheets?**

This is expected behavior! The system is designed to:
- **Always save to Firebase** (critical data)
- **Try to save to Google Sheets** (optional backup)
- **Continue working** even if Google Sheets fails

This ensures no data is lost even if Google Sheets is down.

---

## **Features**

### **Automatic Features:**

✅ **Auto-append new rows** - No manual entry needed  
✅ **Color-coded status** - Visual status indicators  
✅ **Timestamps** - Automatic date/time logging  
✅ **Bold status** - Easy to read  
✅ **No duplicates** - Each submission is unique

### **Status Colors:**

**Bookings:**
- 🟡 Pending → Yellow
- 🔵 Confirmed → Blue
- 🟢 Completed → Green
- 🔴 Cancelled → Red

**Enquiries:**
- 🔵 New → Blue
- 🟡 Contacted → Yellow
- 🟢 Completed → Green

---

## **Data Flow**

```
User submits form on website
        ↓
Data saved to Firebase (Primary)
        ↓
Data sent to Google Sheets (Backup)
        ↓
Appears in Admin Panel (Firebase)
        ↓
Appears in Google Sheet (Backup)
```

**Both systems work independently!**
- If Firebase fails → User sees error, can retry
- If Google Sheets fails → Firebase still saves, user doesn't see error

---

## **Security**

✅ **Script runs as you** - Only you can modify sheet  
✅ **Anyone can post** - Required for website integration  
✅ **No API keys exposed** - URL is public but safe  
✅ **Read-only for others** - Only script can write  
✅ **Firebase is primary** - Google Sheets is backup

---

## **Sharing the Sheet**

You can share the Google Sheet with your team:

1. Click **Share** button (top right)
2. Add email addresses
3. Set permissions:
   - **Viewer** - Can only see data
   - **Commenter** - Can add comments
   - **Editor** - Can modify (not recommended)
4. Click **Send**

**Note:** Even if you share the sheet, only the script can add new rows automatically.

---

## **Cost**

✅ **100% FREE**
- Google Sheets: Free
- Google Apps Script: Free
- No limits on rows (up to 5 million cells per sheet)

---

## **Summary**

✅ Create Google Sheet with 2 tabs (Bookings & Enquiries)  
✅ Add Apps Script code  
✅ Deploy as Web App  
✅ Copy Web App URL  
✅ Add to environment variables  
✅ Redeploy website  
✅ Test from website  
✅ Check sheet for new rows  

**Done!** Your bookings and enquiries will now automatically log to both Firebase and Google Sheets! 🎉
