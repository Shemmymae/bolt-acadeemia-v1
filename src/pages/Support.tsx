import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, MessageSquare, Phone, Mail, Clock, FileText, 
  Video, Book, Users, Zap, CheckCircle, AlertCircle, Search, X
} from 'lucide-react';
import Button from '../components/ui/Button';
import EmailSupportModal from '../components/ui/EmailSupportModal';
import { supabase } from '../lib/supabase';

// Declare Tawk_API types
declare global {
  interface Window {
    Tawk_API?: {
      toggle: () => void;
      maximize: () => void;
      minimize: () => void;
      showWidget: () => void;
      hideWidget: () => void;
      onLoad?: () => void;
    };
  }
}

const Support: React.FC = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    description: ''
  });

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Insert into support_requests table
    try {
      const ticketNumber = `SUP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const { error } = await supabase.from('support_requests').insert({
        name: ticketForm.name,
        email: ticketForm.email,
        topic: ticketForm.subject, // or combine with selectedTicketType if needed
        message: ticketForm.description
      });
      if (error) throw error;
      alert('Support ticket submitted successfully!');
      setTicketForm({ name: '', email: '', subject: '', priority: 'medium', description: '' });
      setSelectedTicketType('');
        } catch (error) {
      alert('Failed to submit support ticket. Please try again.');
      console.error('Error submitting support ticket:', error);
    }
  };

  const handleStartChat = () => {
    // Check if Tawk.to is loaded and available
    if (window.Tawk_API) {
      try {
        // Show the widget if it's hidden
        window.Tawk_API.showWidget();
        // Maximize/open the chat widget
        window.Tawk_API.maximize();
      } catch (error) {
        console.error('Error opening Tawk chat:', error);
        // Fallback: try the toggle method
        try {
          window.Tawk_API.toggle();
        } catch (toggleError) {
          console.error('Error toggling Tawk chat:', toggleError);
          alert('Chat widget is not available at the moment. Please try refreshing the page or contact us via email.');
        }
      }
    } else {
      // Tawk.to not loaded yet, show a message
      alert('Chat widget is loading. Please wait a moment and try again, or contact us via email.');
    }
  };

  const handleCallNow = () => {
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile users, directly open the phone dialer
      window.location.href = 'tel:+254111313818';
    } else {
      // For web users, show a modal with call instructions
      setShowCallModal(true);
    }
  };

  const supportChannels = [
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      description: 'Get help via email with detailed responses',
      contact: 'support@acadeemia.com',
      responseTime: '24 hours',
      availability: '24/7',
      buttonText: 'Send Email',
      action: () => setIsEmailModalOpen(true)
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+254 111 313 818',
      responseTime: 'Immediate',
      availability: 'Mon-Fri 7AM-5PM EAT',
      buttonText: 'Call Now',
      action: handleCallNow
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Live Chat',
      description: 'Real-time chat support for quick questions',
      contact: 'Available on website',
      responseTime: '< 5 minutes',
      availability: 'Mon-Fri 8AM-6PM EAT',
      buttonText: 'Start Chat',
      action: handleStartChat
    }
  ];

  const supportResources = [
    {
      icon: <Book size={24} />,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      link: '#',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <Video size={24} />,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: <HelpCircle size={24} />,
      title: 'FAQ',
      description: 'Frequently asked questions',
      link: '/faq',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <Users size={24} />,
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '#',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const ticketTypes = [
    { id: 'technical', label: 'Technical Issue', icon: <Zap size={20} /> },
    { id: 'billing', label: 'Billing Question', icon: <FileText size={20} /> },
    { id: 'feature', label: 'Feature Request', icon: <CheckCircle size={20} /> },
    { id: 'bug', label: 'Bug Report', icon: <AlertCircle size={20} /> },
    { id: 'general', label: 'General Inquiry', icon: <HelpCircle size={20} /> }
  ];

  return (
    <div className="pt-20 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Support Center
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get the help you need to make the most of Acadeemia's school management system.
          </p>
        </div>
      </section>

      {/* Quick Search */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or common issues..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Get Support</h2>
          <p className="section-subtitle">
            Choose the support channel that works best for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary-50 rounded-full w-14 h-14 flex items-center justify-center text-primary-600 mb-6">
                  {channel.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Contact:</span>
                    <span className="text-sm font-medium">{channel.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Response Time:</span>
                    <span className="text-sm font-medium">{channel.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Availability:</span>
                    <span className="text-sm font-medium">{channel.availability}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={channel.action}
                >
                  {channel.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Service Resources */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title">Self-Service Resources</h2>
          <p className="section-subtitle">
            Find answers and learn how to use Acadeemia effectively.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {supportResources.map((resource, index) => (
              <Link
                key={index}
                to={resource.link}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${resource.color}`}>
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Support Ticket */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Submit a Support Ticket</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Can't find what you're looking for? Submit a detailed support request and our team will get back to you.
            </p>

            <form onSubmit={handleTicketSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Issue Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {ticketTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedTicketType(type.id)}
                      className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                        selectedTicketType === type.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {type.icon}
                      <span className="text-xs mt-1 text-center">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={6}
                  required
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide as much detail as possible about your issue..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Submit Support Ticket
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Support Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Clock size={32} className="mx-auto text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                <p className="text-gray-600 mb-4">Monday - Friday</p>
                <p className="text-2xl font-bold text-primary-600">7:00 am - 5:00 pm</p>
                <p className="text-sm text-gray-500 mt-2">East Africa Time (EAT)</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Mail size={32} className="mx-auto text-secondary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <p className="text-2xl font-bold text-secondary-600">Always Open</p>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Mail size={32} className="mx-auto text-secondary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call & Chat Support</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <p className="text-2xl font-bold text-secondary-600">Always Open</p>
                <p className="text-sm text-gray-500 mt-2">Response within 5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call Instructions Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-primary-50 rounded-lg mr-3">
                    <Phone size={24} className="text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Call Our Support Team</h2>
                </div>
                <button
                  onClick={() => setShowCallModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="text-center">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-2xl font-bold text-primary-600 mb-2">+254 111 313 818</h3>
                  <p className="text-gray-600">Acadeemia Support Line</p>
                </div>

                <div className="text-left space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-900">How to call:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Dial the number above on your phone</li>
                    <li>Wait for our support team to answer</li>
                    <li>Have your account information ready</li>
                    <li>Describe your issue clearly</li>
                  </ol>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Support Hours</h4>
                  <p className="text-blue-800 text-sm">
                    Monday - Friday: 7:00 AM - 5:00 PM (EAT)<br />
                    For urgent issues outside business hours, please send an email.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => setShowCallModal(false)}
                  >
                    Got It
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      setShowCallModal(false);
                      setIsEmailModalOpen(true);
                    }}
                  >
                    Send Email Instead
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Support Modal */}
      <EmailSupportModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
};

export default Support;
