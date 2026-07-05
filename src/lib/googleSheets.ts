// Google Sheets Integration
// This sends data to Google Sheets via Google Apps Script Web App

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface BookingData {
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: string;
  amount: number;
  createdAt: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  serviceInterested?: string;
  message: string;
  status: string;
  createdAt: string;
}

export async function sendBookingToSheets(data: BookingData): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('⚠️ Google Sheets URL not configured');
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'booking',
        data: {
          'Booking ID': data.bookingId,
          'Customer Name': data.customerName,
          'Phone': data.phone,
          'Email': data.email,
          'Service': data.service,
          'Date': data.date,
          'Time': data.time,
          'Amount': data.amount,
          'Status': data.status,
          'Created At': data.createdAt,
        },
      }),
    });
    console.log('✅ Booking sent to Google Sheets');
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    throw error;
  }
}

export async function sendEnquiryToSheets(data: EnquiryData): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('⚠️ Google Sheets URL not configured');
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'enquiry',
        data: {
          'Name': data.name,
          'Phone': data.phone,
          'Email': data.email,
          'Subject': data.subject || 'N/A',
          'Interested Service': data.serviceInterested || 'N/A',
          'Message': data.message,
          'Status': data.status,
          'Created At': data.createdAt,
        },
      }),
    });
    console.log('✅ Enquiry sent to Google Sheets');
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    throw error;
  }
}
