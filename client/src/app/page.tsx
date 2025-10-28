'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  ArrowBigRight,
  ArrowRightFromLineIcon,
  ArrowUpRight,
  LocateIcon,
  Mail,
  MapPin,
  PhoneCall,
  PhoneIncoming,
  PinIcon,
} from 'lucide-react';
import {
  MessageCircle,
  BarChart,
  Bot,
  Rocket,
  BookOpen,
  Bell,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import L from '../../public/svg/wave-haikei.svg';
import Lottie from 'lottie-react';
import animationData from '../../public/animate/manifest.json';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const features = [
  {
    icon: MessageCircle,
    title: 'Live Chat Sessions',
    description:
      'Talk to real people, in real time. Ask questions and get unstuck instantly.',
  },
  {
    icon: BarChart,
    title: 'Personal Learning Dashboard',
    description:
      'Track what you’ve asked, what you’ve learned, and how you’re improving.',
  },
  {
    icon: Bot,
    title: 'AI + Human Collaboration',
    description:
      'AI helps guide and suggest, but real humans give the best answers.',
  },
  {
    icon: Rocket,
    title: 'Instant Matching',
    description:
      'No waiting. Get paired with a helper right after you submit your question.',
  },
  {
    icon: BookOpen,
    title: 'Topic Progress Tracker',
    description:
      'See how confident you are in topics like React, Python, or Data Structures.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Be alerted when a helper joins your session or replies to your question.',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <nav className="flex justify-between p-4 *:font-sans">
        <p className="text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent text-shadow-xs">
          Talktit
        </p>

        <div className="flex">
          <Button
            onClick={() => router.push('/register')}
            variant={'ghost'}
            className="text-md"
          >
            Sign up
          </Button>
          <Button
            onClick={() => router.push('/login')}
            className="rounded-sm text-md shadow-xs bg-gradient-to-r from-orange-400 via-red-500/70 to-red-500  text-white px-6"
          >
            Sign in
          </Button>
        </div>
      </nav>
      <main>
        <div className="relative min-h-screen space-y-8 py-5">
          <Image
            src={L}
            alt="decorative blob"
            fill
            className="object-cover absolute opacity-30 -top-10 -z-10 pointer-events-none select-none"
          />

          {/* Main heading */}
          <div className="mx-auto text-center">
            <h1 className="inline-block text-orange-500  bg-red-500/5 text-lg md:text-sm py-2 px-6 rounded-full animate-bounce">
              Ask smarter. Learn faster. Never get stuck again.
            </h1>
          </div>

          {/* Content section */}
          <div className="max-w-6xl mx-auto space-y-8 px-4">
            <p className="text-3xl md:text-4xl font-medium text-center font-rubik  text-[#060518] leading-tight">
              Whether you're debugging a tricky function, confused by async
              behavior, or just need a second brain - this platform connects you
              with real people, in real time.
            </p>

            <p className="text-lg md:text-xl bg-gradient-to-br from-orange-500 via-red-400 to-orange-300 bg-clip-text text-transparent text-center leading-relaxed">
              No more endless Googling. No more waiting for forum replies.
              <br />
              Just ask, get matched instantly, and learn through live chat — one
              question at a time.
            </p>

            <p className="text-center text-gray-500 text-lg underline">
              Start learning the way you always wanted:
              <span className="text-red-500 mx-1">fast</span>,
              <span className="text-red-500 mx-1">focused</span>, and
              <span className="text-red-500 mx-1 animate-in">human</span>.
            </p>
          </div>

          {/* CTA button */}
          <div className="flex justify-center mt-12">
            <Button className="bg-red-500 hover:bg-red-600 text-white text-lg py-6 px-10 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2">
              Ask a Question & Get Help <ArrowUpRight size={18} />
            </Button>
          </div>
        </div>
        <div className="min-h-screen max-w-[1400px] mx-auto p-5 space-y-8">
          <div className="flex justify-between mt-4 items-center">
            <h1 className="font-pt font-medium text-4xl p-5 ">
              Why Choose Us & <br /> What You Get
            </h1>
            <Button className="font-pt text-lg  bg-red-500 text-md py-6 px-10 rounded-md shadow-xs hover:bg-red-500/80">
              <Sparkles fill="#ffffff" className="stroke-1 w-8 h-8" />
              Let's start learning
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md  hover:shadow-lg hover:border transition-shadow animation-duration-initial duration-500 bg-white text-left"
              >
                <feature.icon className="w-8 h-8 text-red-500 mb-5" />
                <h3 className="text-xl font-pt font-medium">{feature.title}</h3>
                <p className="text-gray-600 mt-2 text-md">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-screen p-5 w-full">
          <div className="p-4 h-[270px] bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 rounded-md space-y-5">
            <h1 className="text-center uppercase font-medium text-white text-2xl font-pt mt-8">
              contact us
            </h1>
            <p className="text-center text-white text-6xl font-pt">
              We'd love to talk to you
            </p>
            <div className="flex gap-8 justify-evenly relative top-10 max-w-[80%] mx-auto">
              <div className="py-10 border space-y-3 bg-white px-8 rounded-md w-1/3 shadow-2xs">
                <div className="flex gap-4">
                  <PhoneIncoming className="w-8 h-8 stroke-orange-500/80" />
                  <div className="flex flex-col align-baseline">
                    <h1 className="uppercase font-pt text-gray-500 text-sm font-medium">
                      Call us
                    </h1>
                    <p className="font-sans font-medium text-lg">
                      +25111789089
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-10 border space-y-3 bg-white px-8 rounded-md w-1/3 shadow-2xs">
                <div className="flex gap-4">
                  <Mail className="w-8 h-8 stroke-orange-500/80" />
                  <div className="flex flex-col align-baseline">
                    <h1 className="uppercase text-gray-500 font-pt text-sm font-medium">
                      Email us
                    </h1>
                    <p className="font-sans font-medium text-lg">
                      sudeisfed@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-10 border space-y-3 px-8 bg-white rounded-md w-1/3 shadow-2xs">
                <div className="flex gap-4">
                  <MapPin className="w-8 h-8 stroke-orange-500/80" />
                  <div className="flex flex-col align-baseline">
                    <h1 className="uppercase text-sm text-gray-500 font-medium font-pt">
                      Head Quarters
                    </h1>
                    <p className="font-sans font-medium text-lg">
                      Addis Abeba, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mt-25 p-4 max-w-6xl  mx-auto">
            <div className="w-[40%] flex flex-col justify-center gap-2">
              <p className="bg-orange-500/5 text-orange-400 shadow-2xs rounded-full py-2 px-4 text-md w-fit font-pt">
                Our success number
              </p>
              <h1 className="text-4xl font-medium">Lets Work Togather</h1>
              <p className="font-pt text-gray-400 text-lg font-medium">
                share us improvements , features too add feedback , please
                contact us for basic questions. we're here to help!
              </p>
            </div>
            <div className="w-[60%]">
              <form className="space-y-6 p-5" autoComplete="off">
                <div className="flex gap-2 w-full">
                  <fieldset className="w-full">
                    <Input
                      placeholder="First Name"
                      className="py-5 rounded-sm"
                    />
                  </fieldset>
                  <fieldset className="w-full">
                    <Input
                      placeholder="Last Name"
                      className="py-5 rounded-sm"
                    />
                  </fieldset>
                </div>
                <fieldset>
                  <Input placeholder="Email" className="py-5 rounded-sm" />
                </fieldset>
                <fieldset>
                  <Input placeholder="subject" className="py-5 rounded-sm" />
                </fieldset>
                <fieldset className="w-full">
                  <textarea
                    className="w-full border p-2 rounded-sm"
                    rows={8}
                    placeholder="Tell us about your feedback , idea  , improvements..."
                  />
                </fieldset>
                <Button className="w-full py-5 rounded-sm bg-gradient-to-r from-orange-500 via-red-400 to-orange-400 text-lg font-sans">
                  Submit
                </Button>
              </form>
            </div>
          </div>
          -
        </div>
      </main>
      <footer className="mt-20 py-10 px-6 text-sm text-black *:font-pt *:font-medium">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-lg italic text-black max-w-xl mx-auto">
            "The right question asked at the right time can change everything."
          </p>

          <div className="flex justify-center gap-6 text-sm text-black font-medium">
            <a href="/terms" className="hover:text-red-500 transition">
              Terms
            </a>
            <a href="/privacy" className="hover:text-red-500 transition">
              Privacy
            </a>
            <a href="/about" className="hover:text-red-500 transition">
              About
            </a>
            <a href="/contact" className="hover:text-red-500 transition">
              Contact
            </a>
          </div>

          <p className="text-xs text-black">
            &copy; {new Date().getFullYear()} Talktit. Built for learners. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
