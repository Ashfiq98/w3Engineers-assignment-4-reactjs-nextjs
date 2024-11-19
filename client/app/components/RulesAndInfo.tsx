"use client";
import { title } from "process";
import { useState } from "react";
import React from 'react'
type SectionKey = 'houseRules' | 'damage' | 'cancellation' | 'important' | 'faq' | null;

interface Rule {
  icon?: string;
  title?: string;
  desc?: string;
}

interface Section {
  title?: string;
  content?: React.ReactNode;
}
export default function RulesAndInfo({title}: Rule) {
    const [activeSection, setActiveSection] = useState<SectionKey>('houseRules');

    // Define sections inside the component
    const sections: Record<Exclude<SectionKey, null>, Section> = {
      houseRules: {
        title: "House Rules",
        content: (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-col justify-between text-sm mb-6">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Check in after</span>
                <span className="text-blue-600">3:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Check out before</span>
                <span className="text-blue-600">11:00 AM</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Minimum age to rent:</span>
                <span className="text-blue-600">25</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '👶', title: 'Children', desc: 'Children allowed: ages 0-17' },
                { icon: '🎉', title: 'Events', desc: 'No events allowed' },
                { icon: '🐾', title: 'Pets', desc: 'No pets allowed' },
                { icon: '🚭', title: 'Smoking', desc: 'Smoking is not permitted' }
              ].map((rule: Rule, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-2xl">{rule.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{rule.title}</h3>
                    <p className="text-sm text-gray-600">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      damage: {
        title: "Damage and incidentals",
        content: (
          <p className="text-sm">
            You will be responsible for any damage to the rental property caused by you or your party during your stay.
          </p>
        )
      },
      cancellation: {
        title: "Cancellation",
        content: (
          <div className="space-y-6">
            <div className="relative py-8 bg-gray-50 px-4 rounded-lg">
              <div className="h-2 bg-gray-200 rounded relative">
                <div className="absolute w-full flex justify-between -mt-6">
                  <span className="text-sm">Today</span>
                  <span className="text-sm">Nov 4</span>
                  <span className="text-sm">Check-in</span>
                </div>
                <div className="absolute w-full flex justify-between -mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>
  
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-600">Before Nov 4</div>
                <h3 className="font-medium">Full refund</h3>
                <p className="text-sm">
                  Cancel your reservation before Nov 4 at 11:59 PM and you'll get a full refund. 
                  Times are based on the property's local time.
                </p>
              </div>
              <div>
                <div className="text-sm text-gray-600">After Nov 4</div>
                <h3 className="font-medium">No refund</h3>
                <p className="text-sm">After that, you won't get a refund.</p>
              </div>
            </div>
          </div>
        )
      },
      important: {
        title: "Important information",
        content: (
          <div>
            <h2 className="font-medium mb-4">You need to know</h2>
            <ul className="space-y-2 text-sm">
              {[
                'Extra-person charges may apply and vary depending on property policy',
                'Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges',
                'Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed',
                'Onsite parties or group events are strictly prohibited',
                'Host has indicated there is a carbon monoxide detector on the property',
                'Host has indicated there is a smoke detector on the property',
                'Safety features at this property include a fire extinguisher and a first aid kit'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      },
      faq: {
        title: "Frequently asked questions",
        content: (
          <div className="space-y-4">
            {[
              `Is ${title ||'Juneau Vacation Home: Stunning View + Beach Access'} pet-friendly?`,
              `What time is check-in at ${title ||'Juneau Vacation Home: Stunning View + Beach Access'} ?`,
              `What time is check-out at ${title ||'Juneau Vacation Home: Stunning View + Beach Access'} ?`,
              `Where is ${title ||'Juneau Vacation Home: Stunning View + Beach Access'}  located?`
            ].map((question, index) => (
              <button key={index} className="w-full text-left flex items-center gap-2 hover:bg-gray-50 p-2 rounded">
                <span className="text-gray-400">▼</span>
                <span className="text-sm">{question}</span>
              </button>
            ))}
          </div>
        )
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {(Object.entries(sections) as [Exclude<SectionKey, null>, Section][]).map(([key, section]) => (
            <div key={key} className="border-b pb-4">
              <button
                onClick={() => setActiveSection(key)}
                className="w-full flex justify-between items-center py-2"
              >
                <h2 className="text-lg font-medium">{section.title}</h2>
                <span className="text-blue-600 text-xl font-medium">
                  {activeSection === key ? '-' : '+'}
                </span>
              </button>
              {activeSection === key && (
                <div className="mt-4">{section.content}</div>
              )}
            </div>
          ))}
        </div>
  
        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          <div className="col-span-4 border-r pr-8">
            <nav className="space-y-6">
              {(Object.entries(sections) as [Exclude<SectionKey, null>, Section][]).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left py-2 ${
                    activeSection === key ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  <h2 className="text-lg">{section.title}</h2>
                </button>
              ))}
            </nav>
          </div>
  
          <div className="col-span-8">
            {activeSection && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">{sections[activeSection].title}</h2>
                {sections[activeSection].content}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
