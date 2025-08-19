"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        userType: ""
      })
    }, 3000)
  }

  return (
    <>

      {/* Hero Section */}
      <section className="pt-24 pb-10">
        <div className="w-full px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-[#163F69] leading-tight font-neulis mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-[#163F69] max-w-2xl mx-auto">
                Have questions about ShootMySurf?<br />Want to get started as a photographer or surfer? We're here to help!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-36">
        <div className="w-full px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#163F69] mb-6 font-neulis">
                    Let's Connect
                  </h2>
                  <p className="text-base text-[#163F69] mb-8 leading-relaxed">
                    Whether you're a surfer looking to find your perfect wave photos or a photographer ready to monetize your surf shots, we're excited to help you get started on your ShootMySurf journey.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D0E6E7] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#163F69]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#163F69] mb-1">Email Us</h3>
                      <p className="text-[#163F69]">hello@shootmysurf.com</p>
                      <p className="text-sm text-[#6B7582]">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Quick Help */}
                <div className="bg-[#D0E6E7] p-6 rounded-xl">
                  <h3 className="font-bold text-[#163F69] mb-3 font-neulis">Quick Help</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-[#163F69]">
                      <span className="font-semibold">Photographers:</span> Ready to upload and sell your surf photos?
                    </p>
                    <p className="text-sm text-[#163F69]">
                      <span className="font-semibold">Surfers:</span> Looking for photos from your last session?
                    </p>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="bg-[#163F69] hover:bg-[#163F69]/90 text-white px-6 py-2 rounded-full text-sm font-semibold"
                      onClick={() => window.location.href = '/#how-it-works'}
                    >
                      How it works
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl border-2 border-[#EEEEEE]">
                <h2 className="text-2xl font-bold text-[#163F69] mb-6 font-neulis">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#163F69] mb-2">Message Sent!</h3>
                    <p className="text-[#6B7582]">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-[#163F69] font-semibold">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 border-[#E5E8EB] focus:border-[#163F69] focus:ring-[#163F69]"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[#163F69] font-semibold">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 border-[#E5E8EB] focus:border-[#163F69] focus:ring-[#163F69]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="userType" className="text-[#163F69] font-semibold">
                        I am a... *
                      </Label>
                      <select
                        id="userType"
                        name="userType"
                        required
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-[#E5E8EB] rounded-md focus:border-[#163F69] focus:ring-[#163F69] focus:ring-1 focus:outline-none"
                      >
                        <option value="">Select your role</option>
                        <option value="surfer">Surfer looking for photos</option>
                        <option value="photographer">Photographer wanting to sell</option>
                        <option value="both">Both surfer and photographer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-[#163F69] font-semibold">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 border-[#E5E8EB] focus:border-[#163F69] focus:ring-[#163F69]"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[#163F69] font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 border-[#E5E8EB] focus:border-[#163F69] focus:ring-[#163F69] resize-none"
                        placeholder="Tell us more about your question or how we can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#163F69] hover:bg-[#163F69]/90 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}