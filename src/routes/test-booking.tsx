import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/test-booking')({
  component: TestBooking,
})

function TestBooking() {
  const [connectionResult, setConnectionResult] = useState('')
  const [servicesResult, setServicesResult] = useState('')
  const [bookingResult, setBookingResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setConnectionResult('Testing connection...')
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('count')
      
      if (error) {
        setConnectionResult(`❌ Connection failed: ${error.message}`)
        console.error('Connection error:', error)
      } else {
        setConnectionResult('✅ Connection successful!')
        console.log('Connection test passed:', data)
      }
    } catch (error: any) {
      setConnectionResult(`❌ Error: ${error.message}`)
      console.error('Exception:', error)
    }
  }

  const testServices = async () => {
    setServicesResult('Loading services...')
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, price, is_active')
        .eq('is_active', true)
        .limit(5)
      
      if (error) {
        setServicesResult(`❌ Failed: ${error.message}`)
        console.error('Services error:', error)
      } else {
        setServicesResult(`✅ Loaded ${data.length} services: ${data.map(s => s.name).join(', ')}`)
        console.log('Services loaded:', data)
      }
    } catch (error: any) {
      setServicesResult(`❌ Error: ${error.message}`)
      console.error('Exception:', error)
    }
  }

  const testBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setBookingResult('Creating booking...')
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const service = formData.get('service') as string
    const date = formData.get('date') as string
    const message = formData.get('message') as string
    
    try {
      // Step 1: Create customer
      console.log('Step 1: Creating customer...')
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', phone)
        .single()
      
      let customerId
      if (existingCustomer) {
        customerId = existingCustomer.id
        console.log('Customer exists:', customerId)
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert([{
            full_name: name,
            phone: phone,
            email: email || null,
            status: 'active'
          }])
          .select('id')
          .single()
        
        if (customerError) {
          throw customerError
        }
        customerId = newCustomer.id
        console.log('Customer created:', customerId)
      }
      
      // Step 2: Get service ID
      console.log('Step 2: Getting service...')
      const { data: serviceData } = await supabase
        .from('services')
        .select('id, price')
        .eq('name', service)
        .eq('is_active', true)
        .single()
      
      console.log('Service found:', serviceData)
      
      // Step 3: Create appointment
      console.log('Step 3: Creating appointment...')
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          customer_id: customerId,
          service_id: serviceData?.id || null,
          appointment_date: date,
          appointment_time: '10:00:00',
          status: 'pending',
          customer_notes: message,
          total_amount: 0,
          discount_amount: 0,
          paid_amount: 0,
          payment_status: 'pending'
        }])
        .select('*, booking_reference')
        .single()
      
      if (appointmentError) {
        throw appointmentError
      }
      
      setBookingResult(`✅ Booking created successfully! Reference: ${appointment.booking_reference}`)
      console.log('Booking complete:', appointment)
      
    } catch (error: any) {
      setBookingResult(`❌ Booking failed: ${error.message} (Code: ${error.code})`)
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f8f5f0] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#d4af37]">🧪 Supabase Connection Test</h1>
        <p className="mb-8">This page will test your Supabase connection and booking system</p>

        {/* TEST 1: Connection Test */}
        <div className="bg-[#1a1a1a] border-2 border-[#d4af37] p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Test 1: Check Supabase Connection</h2>
          <button 
            onClick={testConnection}
            className="bg-[#d4af37] text-[#0d0d0d] px-6 py-3 rounded hover:bg-[#c49b2d] transition"
          >
            Test Connection
          </button>
          {connectionResult && (
            <div className={`mt-4 p-4 rounded ${connectionResult.includes('✅') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
              {connectionResult}
            </div>
          )}
        </div>

        {/* TEST 2: View Services */}
        <div className="bg-[#1a1a1a] border-2 border-[#d4af37] p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Test 2: Load Services</h2>
          <button 
            onClick={testServices}
            className="bg-[#d4af37] text-[#0d0d0d] px-6 py-3 rounded hover:bg-[#c49b2d] transition"
          >
            Load Services
          </button>
          {servicesResult && (
            <div className={`mt-4 p-4 rounded ${servicesResult.includes('✅') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
              {servicesResult}
            </div>
          )}
        </div>

        {/* TEST 3: Create Booking */}
        <div className="bg-[#1a1a1a] border-2 border-[#d4af37] p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Test 3: Create Test Booking</h2>
          <form onSubmit={testBooking} className="space-y-4">
            <div>
              <label className="block text-[#d4af37] mb-2">Name:</label>
              <input 
                type="text" 
                name="name" 
                defaultValue="Test User"
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
                required 
              />
            </div>
            
            <div>
              <label className="block text-[#d4af37] mb-2">Phone:</label>
              <input 
                type="tel" 
                name="phone" 
                defaultValue="9876543210"
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
                required 
              />
            </div>
            
            <div>
              <label className="block text-[#d4af37] mb-2">Email:</label>
              <input 
                type="email" 
                name="email" 
                defaultValue="test@test.com"
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
              />
            </div>
            
            <div>
              <label className="block text-[#d4af37] mb-2">Service:</label>
              <select 
                name="service"
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
                required
              >
                <option value="Bridal Makeup">Bridal Makeup</option>
                <option value="Reception">Reception</option>
                <option value="Engagement">Engagement</option>
                <option value="Hair Styling">Hair Styling</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#d4af37] mb-2">Date:</label>
              <input 
                type="date" 
                name="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
                required 
              />
            </div>
            
            <div>
              <label className="block text-[#d4af37] mb-2">Message:</label>
              <input 
                type="text" 
                name="message" 
                defaultValue="Test booking"
                className="w-full bg-[#0d0d0d] border border-[#d4af37] p-3 rounded text-[#f8f5f0]"
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#d4af37] text-[#0d0d0d] px-6 py-3 rounded hover:bg-[#c49b2d] transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Test Booking'}
            </button>
          </form>
          {bookingResult && (
            <div className={`mt-4 p-4 rounded ${bookingResult.includes('✅') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
              {bookingResult}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded">
          <p className="text-blue-400">
            💡 <strong>Tip:</strong> Open the browser console (F12 → Console tab) to see detailed logs for each test.
          </p>
        </div>
      </div>
    </div>
  )
}
