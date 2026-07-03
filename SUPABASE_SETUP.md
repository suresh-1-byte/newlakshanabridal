# 🚀 Supabase Backend Integration - Lakshana Luxe Glow

## Why Supabase? ✨

✅ **No server code needed** - Just frontend integration
✅ **Instant database** - PostgreSQL ready in 2 minutes  
✅ **Built-in auth** - No JWT hassle
✅ **Real-time updates** - Live data sync
✅ **Free forever tier** - 500MB database, 2GB storage
✅ **Auto-generated APIs** - REST & GraphQL included
✅ **No MongoDB setup** - Cloud-hosted PostgreSQL

---

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Email
4. Create new project:
   - Name: `lakshana-luxe-glow`
   - Database Password: (save this!)
   - Region: Choose closest to you
   - Click "Create new project"

Wait 2-3 minutes for database to initialize...

### Step 2: Create Database Tables

In Supabase Dashboard → SQL Editor → New Query, run:

\`\`\`sql
-- Bookings Table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date TIMESTAMP NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contacts Table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Academy Enrollments Table
CREATE TABLE academy_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  program TEXT NOT NULL,
  preferred_start_date TIMESTAMP NOT NULL,
  experience TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],
  category TEXT NOT NULL,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Anyone can read active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can read active gallery"
  ON gallery FOR SELECT
  USING (is_active = true);

-- Public Insert Policies
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create enrollments"
  ON academy_enrollments FOR INSERT
  WITH CHECK (true);
\`\`\`

### Step 3: Seed Sample Data

\`\`\`sql
-- Insert sample testimonials
INSERT INTO testimonials (quote, name, role, rating, is_active, order_position)
VALUES 
  ('Lakshana didn''t just do my makeup — they made me feel like the most beautiful version of myself.', 'Aishwarya R.', 'Bride · Chennai', 5, true, 1),
  ('The team understood exactly what I wanted. My reception look went viral on Instagram!', 'Divya S.', 'Bride · Coimbatore', 5, true, 2),
  ('I trained at the academy and now I''m a full-time bridal artist. World-class mentorship!', 'Priyanka V.', 'Academy Graduate', 5, true, 3);
\`\`\`

### Step 4: Get API Credentials

In Supabase Dashboard → Settings → API:

Copy these values:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon/public key**: `eyJhbGc...` (long string)

### Step 5: Clear Disk Space & Install

\`\`\`bash
# Free up disk space first!
# Delete node_modules in other projects
# Empty recycle bin
# Run disk cleanup

# Then install Supabase
npm install @supabase/supabase-js
\`\`\`

### Step 6: Configure Environment

Update `.env`:

\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

---

## 💻 Frontend Integration

### Create Supabase Client

\`\`\`typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface Booking {
  id?: string
  name: string
  phone: string
  email?: string
  service: string
  preferred_date: string
  message?: string
  status?: string
  created_at?: string
}

export interface Contact {
  id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status?: string
  created_at?: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  rating?: number
  is_active: boolean
}
\`\`\`

### Update Book Component

\`\`\`typescript
// src/components/Book.tsx
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

// In handleSubmit:
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsSubmitting(true)

  const formData = new FormData(e.currentTarget)
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        preferred_date: formData.get('date'),
        message: formData.get('message'),
      }
    ])

  if (error) {
    toast.error('Failed to submit booking. Please try again.')
    console.error(error)
  } else {
    toast.success('Booking submitted! We\'ll contact you within 24 hours.')
    (e.target as HTMLFormElement).reset()
  }
  
  setIsSubmitting(false)
}
\`\`\`

### Update Testimonials Component

\`\`\`typescript
// src/components/Testimonials.tsx
import { supabase } from '../lib/supabase'

useEffect(() => {
  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('order_position', { ascending: true })
    
    if (data) setQuotes(data)
    setLoading(false)
  }
  
  fetchTestimonials()
}, [])
\`\`\`

### Contact Form

\`\`\`typescript
// Add to Contact.tsx or create new component
const submitContact = async (data: any) => {
  const { error } = await supabase
    .from('contacts')
    .insert([data])
  
  if (!error) {
    toast.success('Message sent successfully!')
  }
}
\`\`\`

### Academy Enrollment

\`\`\`typescript
// Add to Academy.tsx
const submitEnrollment = async (data: any) => {
  const { error } = await supabase
    .from('academy_enrollments')
    .insert([data])
  
  if (!error) {
    toast.success('Enrollment submitted successfully!')
  }
}
\`\`\`

---

## 🎯 Real-time Updates (Bonus)

\`\`\`typescript
// Listen to new bookings in real-time
supabase
  .channel('bookings')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'bookings' },
    (payload) => {
      console.log('New booking!', payload.new)
      // Update UI automatically
    }
  )
  .subscribe()
\`\`\`

---

## 🔐 Admin Dashboard Setup

### Enable Email Auth

1. Supabase Dashboard → Authentication → Providers
2. Enable Email provider
3. Create admin user:

\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email: 'admin@lakshana.com',
  password: 'YourSecurePassword123!'
})
\`\`\`

### Protected Admin Queries

\`\`\`typescript
// Login
const { data } = await supabase.auth.signInWithPassword({
  email: 'admin@lakshana.com',
  password: 'password'
})

// Get all bookings (admin only)
const { data: bookings } = await supabase
  .from('bookings')
  .select('*')
  .order('created_at', { ascending: false })

// Update booking status
await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('id', bookingId)
\`\`\`

---

## 📊 Advantages Over MongoDB Backend

| Feature | Supabase | MongoDB Backend |
|---------|----------|-----------------|
| Setup Time | 5 minutes | 30+ minutes |
| Server Code | None needed | 100+ files |
| Hosting | Free tier included | Need separate hosting |
| Real-time | Built-in | Need Socket.io |
| Auth | Built-in | Need JWT setup |
| Admin UI | Auto-generated | Build from scratch |
| Cost | Free forever | Server costs |

---

## 🎨 Supabase Dashboard Features

Once set up, you get:
- 📊 **Table Editor** - Edit data like Excel
- 📈 **SQL Editor** - Run queries
- 🔐 **Auth Management** - Manage users
- 📁 **Storage** - Upload images (for gallery)
- 📡 **API Docs** - Auto-generated
- 🔔 **Real-time** - Live updates
- 📊 **Analytics** - Usage stats

---

## ✅ Complete Feature List

With Supabase you get ALL these features working:

- ✅ Booking system
- ✅ Contact forms
- ✅ Academy enrollments
- ✅ Dynamic testimonials
- ✅ Gallery management
- ✅ Admin authentication
- ✅ Real-time updates
- ✅ File storage
- ✅ Automatic APIs
- ✅ Database backups
- ✅ Analytics

---

## 🚀 Quick Test

After setup, test with:

\`\`\`javascript
// In browser console
const { data } = await supabase.from('testimonials').select('*')
console.log(data)
\`\`\`

---

## 💡 Pro Tips

1. **Use Supabase Storage** for gallery images (built-in CDN!)
2. **Enable RLS policies** for security
3. **Use Supabase Auth** instead of JWT
4. **Monitor API usage** in dashboard
5. **Set up webhooks** for email notifications

---

## 📚 Resources

- Supabase Docs: https://supabase.com/docs
- React Guide: https://supabase.com/docs/guides/with-react
- TypeScript: https://supabase.com/docs/reference/javascript

---

## 🎯 Next Steps

1. ✅ Create Supabase account
2. ✅ Run SQL to create tables
3. ✅ Free up disk space (very important!)
4. ✅ Install: `npm install @supabase/supabase-js`
5. ✅ Create `src/lib/supabase.ts`
6. ✅ Update components to use Supabase
7. ✅ Test booking form
8. 🎉 Done!

---

**Much simpler than MongoDB backend! No server needed!** 🚀
