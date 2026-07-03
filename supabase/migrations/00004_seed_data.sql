-- =====================================================
-- SEED DATA - Initial Content
-- =====================================================

-- =====================================================
-- 1. SERVICE CATEGORIES
-- =====================================================

INSERT INTO service_categories (name, slug, description, display_order, is_active) VALUES
('Bridal Makeup', 'bridal-makeup', 'Complete bridal makeup services for your special day', 1, true),
('Hair Styling', 'hair-styling', 'Professional hair styling and treatments', 2, true),
('Skin Care', 'skin-care', 'Luxury skin care treatments and facials', 3, true),
('Spa & Wellness', 'spa-wellness', 'Relaxing spa and wellness packages', 4, true),
('Nail Art', 'nail-art', 'Creative nail art and manicure services', 5, true),
('Reception & Engagement', 'reception-engagement', 'Makeup for receptions and engagements', 6, true),
('Pre-Bridal Packages', 'pre-bridal-packages', 'Complete pre-bridal preparation packages', 7, true);

-- =====================================================
-- 2. SAMPLE SERVICES
-- =====================================================

INSERT INTO services (
  category_id,
  name,
  slug,
  short_description,
  description,
  duration_minutes,
  price,
  offer_price,
  is_popular,
  is_featured,
  is_active,
  display_order
) VALUES
-- Bridal Services
(
  (SELECT id FROM service_categories WHERE slug = 'bridal-makeup'),
  'Bridal Makeup',
  'bridal-makeup',
  'Complete bridal makeup with HD finish',
  'Our signature bridal makeup service includes consultation, trial session, and wedding day makeup with premium products',
  180,
  25000.00,
  22000.00,
  true,
  true,
  true,
  1
),
(
  (SELECT id FROM service_categories WHERE slug = 'reception-engagement'),
  'Reception Makeup',
  'reception-makeup',
  'Glamorous makeup for your reception',
  'Elegant reception makeup that photographs beautifully',
  120,
  15000.00,
  13000.00,
  true,
  false,
  true,
  2
),
(
  (SELECT id FROM service_categories WHERE slug = 'reception-engagement'),
  'Engagement Makeup',
  'engagement-makeup',
  'Perfect makeup for your engagement ceremony',
  'Soft and elegant makeup perfect for your engagement day',
  120,
  12000.00,
  10000.00,
  false,
  false,
  true,
  3
),
-- Hair Services
(
  (SELECT id FROM service_categories WHERE slug = 'hair-styling'),
  'Bridal Hair Styling',
  'bridal-hair-styling',
  'Complete hair styling with accessories',
  'Professional bridal hair styling including draping and accessories placement',
  150,
  8000.00,
  7000.00,
  true,
  true,
  true,
  4
),
(
  (SELECT id FROM service_categories WHERE slug = 'hair-styling'),
  'Hair Spa Treatment',
  'hair-spa-treatment',
  'Nourishing hair spa treatment',
  'Deep conditioning hair spa with hot oil treatment',
  90,
  3000.00,
  NULL,
  false,
  false,
  true,
  5
),
-- Skin Care
(
  (SELECT id FROM service_categories WHERE slug = 'skin-care'),
  'Luxury Facial',
  'luxury-facial',
  'Premium facial treatment',
  'Luxurious facial treatment with imported products',
  90,
  5000.00,
  NULL,
  true,
  false,
  true,
  6
),
(
  (SELECT id FROM service_categories WHERE slug = 'skin-care'),
  'Bridal Glow Facial',
  'bridal-glow-facial',
  'Special pre-bridal facial treatment',
  'Intensive facial treatment for radiant bridal glow',
  120,
  7000.00,
  6000.00,
  true,
  true,
  true,
  7
);

-- =====================================================
-- 3. BRIDAL PACKAGES
-- =====================================================

INSERT INTO bridal_packages (
  name,
  slug,
  description,
  price,
  offer_price,
  duration_days,
  highlights,
  is_popular,
  is_active,
  display_order
) VALUES
(
  'Classic Bridal Package',
  'classic-bridal-package',
  'Complete bridal package with all essential services',
  75000.00,
  65000.00,
  NULL,
  ARRAY[
    'Bridal Makeup',
    'Bridal Hair Styling',
    'Pre-Bridal Facial',
    'Saree Draping',
    'Makeup Trial'
  ],
  true,
  true,
  1
),
(
  'Royal Bridal Package',
  'royal-bridal-package',
  'Premium bridal package with pre-bridal care',
  150000.00,
  135000.00,
  30,
  ARRAY[
    'All Classic Package Services',
    '4 Pre-Bridal Facials',
    'Hair Spa Sessions',
    'Nail Art',
    'Mehendi Coordination',
    'Engagement Makeup',
    'Reception Makeup'
  ],
  true,
  true,
  2
),
(
  'Luxury Bridal Experience',
  'luxury-bridal-experience',
  'Ultimate luxury bridal experience',
  250000.00,
  225000.00,
  60,
  ARRAY[
    'All Royal Package Services',
    'Weekly Skincare Sessions',
    'Hair Treatments',
    'Body Spa',
    'Personal Bridal Consultant',
    'At-Home Services Available'
  ],
  false,
  true,
  3
);

-- =====================================================
-- 4. ACADEMY COURSES
-- =====================================================

INSERT INTO academy_courses (
  name,
  slug,
  description,
  duration_weeks,
  duration_months,
  price,
  offer_price,
  syllabus,
  what_you_learn,
  certification,
  is_active,
  display_order
) VALUES
(
  'Professional Makeup Artist Course',
  'professional-makeup-artist-course',
  'Complete professional makeup artist training',
  12,
  3,
  85000.00,
  75000.00,
  ARRAY[
    'Makeup Basics & Hygiene',
    'Skin Types & Color Theory',
    'Day & Evening Makeup',
    'Bridal Makeup Techniques',
    'HD & Airbrush Makeup',
    'Prosthetic Makeup'
  ],
  ARRAY[
    'Professional makeup techniques',
    'Bridal makeup mastery',
    'Portfolio building',
    'Client management',
    'Business setup guidance'
  ],
  true,
  true,
  1
),
(
  'Hair Styling & Management',
  'hair-styling-management',
  'Professional hair styling course',
  8,
  2,
  50000.00,
  45000.00,
  ARRAY[
    'Hair Types & Care',
    'Basic to Advanced Styling',
    'Bridal Hairstyles',
    'Hair Treatments',
    'Hair Color Theory'
  ],
  ARRAY[
    'All hair styling techniques',
    'Bridal hairstyling',
    'Hair treatment procedures',
    'Salon management'
  ],
  true,
  true,
  2
);

-- =====================================================
-- 5. TESTIMONIALS
-- =====================================================

INSERT INTO testimonials (
  customer_name,
  designation,
  rating,
  review,
  is_approved,
  is_active,
  is_featured,
  display_order
) VALUES
(
  'Aishwarya Reddy',
  'Bride · Chennai',
  5,
  'Lakshana made my wedding day absolutely perfect! The makeup was flawless and lasted throughout the ceremony. The team was professional, punctual, and so caring. Highly recommended!',
  true,
  true,
  true,
  1
),
(
  'Priya Sharma',
  'Bride · Coimbatore',
  5,
  'Best bridal makeup experience ever! The attention to detail was incredible. My makeup looked stunning in photos and in person. Thank you Lakshana team!',
  true,
  true,
  true,
  2
),
(
  'Divya Krishnan',
  'Bride · Madurai',
  5,
  'I enrolled in the professional makeup course and it changed my life! Now I am a certified makeup artist with my own studio. Thank you Lakshana Academy!',
  true,
  true,
  false,
  3
),
(
  'Meera Patel',
  'Bride · Bangalore',
  5,
  'The pre-bridal package was worth every penny. My skin glowed on my wedding day. The team is knowledgeable, friendly, and truly passionate about their work.',
  true,
  true,
  true,
  4
);

-- =====================================================
-- 6. GALLERY CATEGORIES
-- =====================================================

INSERT INTO gallery_categories (name, slug, display_order, is_active) VALUES
('Bridal Makeup', 'bridal-makeup', 1, true),
('Reception Looks', 'reception-looks', 2, true),
('Engagement', 'engagement', 3, true),
('Hair Styling', 'hair-styling', 4, true),
('Before & After', 'before-after', 5, true),
('Academy Work', 'academy-work', 6, true);

-- =====================================================
-- 7. FAQS
-- =====================================================

INSERT INTO faqs (category, question, answer, display_order, is_active) VALUES
('Bridal Services', 'Do you provide makeup trials?', 'Yes, we offer complimentary makeup trials for all bridal packages. This helps us understand your preferences and ensures you are completely satisfied with your look.', 1, true),
('Bridal Services', 'How far in advance should I book?', 'We recommend booking at least 3-6 months in advance, especially for wedding season (October to March). However, we always try to accommodate last-minute bookings based on availability.', 2, true),
('Bridal Services', 'What products do you use?', 'We use only premium international brands like MAC, Huda Beauty, Bobbi Brown, NARS, and more. All products are 100% authentic and suitable for Indian skin tones.', 3, true),
('Pricing', 'What is included in the bridal package?', 'Our bridal packages include makeup, hair styling, saree draping, and accessories placement. Premium packages also include pre-bridal treatments and trial sessions.', 4, true),
('Pricing', 'Do you have EMI options?', 'Yes, we offer flexible payment plans and EMI options for packages above ₹50,000. Please contact us for more details.', 5, true),
('Academy', 'Are the courses certified?', 'Yes, all our courses are certified and recognized. You will receive an official certificate upon successful completion of the course.', 6, true),
('Academy', 'What is the class schedule?', 'Classes are conducted on weekdays (Mon-Fri) for full-time courses and on weekends for part-time courses. Timings are flexible and can be discussed during enrollment.', 7, true),
('General', 'Do you travel for destination weddings?', 'Yes, we provide services for destination weddings across India and internationally. Travel charges apply based on location.', 8, true),
('General', 'What is your cancellation policy?', 'Cancellations made 30 days before the event receive a full refund minus processing fee. Cancellations within 15 days receive 50% refund. No refund for cancellations within 7 days of the event.', 9, true);

-- =====================================================
-- 8. POLICIES
-- =====================================================

INSERT INTO policies (type, title, content) VALUES
('privacy', 'Privacy Policy', 'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information...'),
('terms', 'Terms & Conditions', 'By using our services, you agree to these terms and conditions...'),
('cancellation', 'Cancellation Policy', 'Cancellations must be made in writing via email. Refund policy varies based on the cancellation timeline...'),
('refund', 'Refund Policy', 'Refunds are processed within 7-10 business days after approval. The amount will be credited to the original payment method...');

-- =====================================================
-- 9. BLOG CATEGORIES
-- =====================================================

INSERT INTO blog_categories (name, slug, description, display_order, is_active) VALUES
('Bridal Tips', 'bridal-tips', 'Tips and advice for brides', 1, true),
('Makeup Trends', 'makeup-trends', 'Latest makeup trends and techniques', 2, true),
('Hair Care', 'hair-care', 'Hair care tips and tutorials', 3, true),
('Beauty Tips', 'beauty-tips', 'General beauty and skincare tips', 4, true),
('Wedding Planning', 'wedding-planning', 'Wedding planning guides', 5, true);

-- =====================================================
-- 10. ABOUT CONTENT
-- =====================================================

INSERT INTO about_content (
  title,
  content,
  mission,
  vision,
  values,
  experience_years,
  team_size,
  happy_clients,
  awards
) VALUES (
  'About Lakshana Bridal Studio',
  'Lakshana Bridal Studio is Chennai''s premier luxury bridal makeup and beauty destination. Founded with a vision to make every bride feel like royalty, we have been transforming dreams into reality for over a decade.',
  'To provide world-class bridal makeup and beauty services that enhance natural beauty and create unforgettable experiences.',
  'To be India''s most trusted and loved bridal beauty brand, known for excellence, innovation, and customer satisfaction.',
  ARRAY['Excellence', 'Innovation', 'Integrity', 'Customer First', 'Passion'],
  10,
  25,
  5000,
  15
);

-- =====================================================
-- 11. TEAM MEMBERS
-- =====================================================

INSERT INTO team_members (
  name,
  designation,
  bio,
  specialization,
  experience_years,
  display_order,
  is_active
) VALUES
(
  'Lakshana Reddy',
  'Founder & Lead Makeup Artist',
  'Celebrity makeup artist with over 10 years of experience in bridal and fashion makeup',
  ARRAY['Bridal Makeup', 'HD Makeup', 'Fashion Makeup'],
  10,
  1,
  true
),
(
  'Priya Kumar',
  'Senior Makeup Artist',
  'Specialized in traditional South Indian bridal makeup',
  ARRAY['Traditional Bridal', 'Airbrush Makeup'],
  8,
  2,
  true
),
(
  'Aishwarya Menon',
  'Hair Styling Expert',
  'Award-winning hair stylist with expertise in bridal hairstyling',
  ARRAY['Bridal Hairstyling', 'Hair Treatments', 'Hair Coloring'],
  7,
  3,
  true
);

-- =====================================================
-- SEED DATA COMPLETE
-- =====================================================
