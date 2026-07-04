# 📖 Admin Panel User Guide

## 🔐 Login

**URL:** https://www.lakshanaatelier.in/admin/login

**Credentials:**
- Email: `sureshkatirvel601@gmail.com`
- Password: `Adminlaks123@`

---

## 📊 Dashboard Overview

### What You'll See:
1. **Statistics Cards:**
   - Total Appointments
   - Pending Bookings
   - Total Customers
   - Total Revenue

2. **Secondary Stats:**
   - Completed Bookings
   - Cancelled Bookings
   - Today's Appointments

3. **Recent Appointments Table:**
   - Latest 5 bookings
   - Quick status overview
   - Link to full bookings page

---

## 📅 Managing Bookings

### Accessing Bookings:
1. Click "Bookings" in sidebar
2. OR click "View all →" from Dashboard

### Features Available:

#### 🔍 Search & Filter
- **Search Box:** Type customer name, phone, or booking reference
- **Status Filter:** Filter by Pending, Confirmed, Completed, etc.

#### ✅ Confirming Bookings (NEW!)

**Method 1: From Table**
1. Find pending booking in list
2. Click green "Confirm" button
3. Review details in dialog
4. Click "Confirm Booking"
5. Done! Status changes to "Confirmed"

**Method 2: From Details Modal**
1. Click blue "View" (eye icon) on any booking
2. Review all booking information
3. Click "Confirm Booking" at bottom (if pending)
4. Confirm in dialog
5. Done!

#### 👁️ View Booking Details
**Click the blue eye icon to see:**
- 🔵 Booking Information (date, time, reference, status)
- 💜 Customer Information (name, phone, email)
- 💚 Payment Information (total, paid, status)
- 🟡 Customer Notes (special requests)
- ⚪ Admin Notes (internal notes)
- 💬 WhatsApp Quick Contact Button

#### 📱 Contact Customer via WhatsApp
1. Open booking details
2. Click "Open WhatsApp Chat" button
3. Opens WhatsApp with pre-filled message
4. Send booking confirmation or updates

#### 📝 Update Booking Status
**Available Statuses:**
- **Pending** - New booking awaiting review
- **Confirmed** - Booking confirmed with customer
- **In Progress** - Customer is currently being serviced
- **Completed** - Service completed successfully
- **Cancelled** - Booking was cancelled
- **Rescheduled** - Booking moved to different date/time
- **No Show** - Customer didn't arrive

**How to Update:**
1. Click the status dropdown in the table
2. Select new status
3. Changes save automatically

#### 🗑️ Delete Booking
1. Click red trash icon
2. Confirm deletion in dialog
3. Booking is permanently removed

#### 📥 Export to Excel
1. Click "Export to Excel" button at top
2. Excel file downloads automatically
3. Contains all booking data with current filters applied

---

## 🖼️ Managing Gallery

### Accessing Gallery:
Click "Gallery" in sidebar

### Adding New Images:

1. **Click "Add New Image" button** (large gold button at top)

2. **Upload Image:**
   - Click "Choose File" in the upload area
   - Select image from your computer
   - Preview appears immediately

3. **Fill Details:**
   - **Title*** (Required): Short name for the image
   - **Description** (Optional): Brief description

4. **Submit:**
   - Click "Add Image" button
   - Image uploads to Firebase Storage
   - Appears in gallery automatically

### Managing Existing Images:

#### 👁️ Publish/Unpublish to Website
**Green Badge = Published** (visible on website)
**Gray Badge = Unpublished** (hidden from website)

**To Toggle:**
1. Find the image card
2. Click "Publish to Website" or "Unpublish from Website" button
3. Status changes immediately
4. Website updates in real-time

#### ✏️ Edit Image
1. Click blue "Edit" button
2. Update title or description
3. Optionally upload new image
4. Click "Update Image"

#### 🗑️ Delete Image
1. Click red "Delete" button
2. Confirm deletion in dialog
3. Image removed from gallery and storage

---

## 👥 Customers Page

### View Customer List:
- See all unique customers
- View booking history per customer
- Contact information readily available

### Features:
- Search customers by name/phone
- View total bookings per customer
- Quick access to customer details

---

## 📋 Booking History Page

### Comprehensive Booking Records:
- View all past bookings
- Filter by date range
- Export historical data
- Analyze booking patterns

---

## ⚙️ Settings Page

### Profile Settings:
- Update admin profile
- Change password
- Notification preferences

### System Settings:
- Booking configuration
- Service management
- Business hours

---

## 🎯 Quick Actions

### From Dashboard:
```
✅ View pending bookings → Click "Pending" stat card
✅ Check today's schedule → See "Today's Appointments" card
✅ Quick revenue overview → "Total Revenue" card
✅ Access recent bookings → Recent table at bottom
```

### From Bookings:
```
✅ Confirm pending → Green "Confirm" button
✅ View details → Blue eye icon
✅ Contact customer → WhatsApp button in details
✅ Update status → Status dropdown
✅ Export data → "Export to Excel" button
```

### From Gallery:
```
✅ Add image → "Add New Image" button
✅ Publish/unpublish → Toggle button on each card
✅ Edit content → Blue "Edit" button
✅ Remove image → Red "Delete" button
```

---

## 💡 Pro Tips

### Booking Management:
1. **Daily Routine:**
   - Check Dashboard for pending bookings
   - Confirm new bookings quickly with new button
   - Contact customers via WhatsApp
   - Update status as service progresses

2. **Customer Communication:**
   - Use WhatsApp button for quick contact
   - Pre-filled messages include booking details
   - Maintain professional communication

3. **Data Management:**
   - Export bookings weekly for records
   - Use filters to find specific bookings
   - Keep admin notes for reference

### Gallery Management:
1. **Publishing Strategy:**
   - Keep best work published
   - Unpublish outdated/seasonal content
   - Regularly add fresh content

2. **Image Quality:**
   - Use high-quality images
   - Optimize file size before upload
   - Use descriptive titles

3. **Organization:**
   - Name images clearly
   - Add meaningful descriptions
   - Keep gallery current

---

## 🚨 Common Tasks

### Task: Confirm New Booking
```
1. Go to Bookings page
2. Find pending booking (yellow "pending" badge)
3. Click green "Confirm" button
4. Review details in dialog
5. Click "Confirm Booking"
6. ✅ Done! Customer notified
```

### Task: Contact Customer
```
1. Go to Bookings page
2. Click eye icon on booking
3. Scroll to WhatsApp button
4. Click "Open WhatsApp Chat"
5. Send message in WhatsApp
6. ✅ Done!
```

### Task: Add Gallery Image
```
1. Go to Gallery page
2. Click "Add New Image" button
3. Upload image file
4. Enter title
5. Click "Add Image"
6. ✅ Done! Image uploaded
```

### Task: Publish Gallery Image to Website
```
1. Go to Gallery page
2. Find image card
3. Click "Publish to Website" button
4. ✅ Done! Visible on website
```

### Task: Export Booking Data
```
1. Go to Bookings page
2. Apply any filters needed (optional)
3. Click "Export to Excel" button
4. ✅ Done! Excel file downloads
```

---

## 🔔 Real-Time Updates

**Your admin panel uses real-time Firebase sync!**

### What This Means:
- ✅ New bookings appear instantly
- ✅ Status changes update immediately
- ✅ Gallery changes reflect right away
- ✅ No need to refresh page
- ✅ Multiple admins can work simultaneously

### Indicator:
Look for **green dot** "● Real-time updates" under page title

---

## 📱 Mobile Access

### Fully Responsive:
- ✅ Access from phone or tablet
- ✅ All features work on mobile
- ✅ Touch-optimized buttons
- ✅ Swipe-friendly interface

### Mobile Tips:
- Use landscape mode for tables
- Sidebar collapses automatically
- Tap icons for quick actions
- Pinch to zoom on details

---

## ❓ Troubleshooting

### Can't See New Bookings?
- Check real-time indicator (green dot)
- Refresh page (Ctrl+R / Cmd+R)
- Check internet connection

### Confirm Button Not Showing?
- Only appears for "Pending" bookings
- Already confirmed bookings won't show it
- Check booking status

### Gallery Image Not Appearing on Website?
- Check if image is "Published" (green badge)
- Click "Publish to Website" button
- Wait 1-2 minutes for cache refresh
- Check website in incognito mode

### WhatsApp Link Not Working?
- Ensure phone number is valid
- Check WhatsApp is installed
- Try copying number manually

---

## 🎓 Best Practices

### Booking Management:
1. ✅ Confirm bookings within 24 hours
2. ✅ Update status as service progresses
3. ✅ Add admin notes for special requests
4. ✅ Contact customers for confirmation
5. ✅ Export data weekly for backup

### Gallery Management:
1. ✅ Upload only high-quality images
2. ✅ Use clear, descriptive titles
3. ✅ Keep published gallery fresh (10-20 images)
4. ✅ Remove outdated content
5. ✅ Add new work regularly

### Data Security:
1. ✅ Log out after use
2. ✅ Don't share credentials
3. ✅ Use strong password
4. ✅ Access from secure networks
5. ✅ Regular backups via export

---

## 📞 Support

### Need Help?
- Check this guide first
- Review troubleshooting section
- Contact technical support

### Feature Requests:
- Email your suggestions
- Describe desired functionality
- Include use case examples

---

## 🎉 Keyboard Shortcuts

### Navigation:
- `Esc` - Close modals/dialogs
- `Tab` - Navigate between fields
- `Enter` - Submit forms

### Quick Actions:
- `Ctrl/Cmd + F` - Focus search box
- `Ctrl/Cmd + S` - Save changes (in forms)

---

**Status:** ✅ Ready to Use
**Version:** 2.1.0
**Last Updated:** January 4, 2026

---

💼 **Your complete guide to managing Lakshana Bridal Studio bookings and gallery!**
