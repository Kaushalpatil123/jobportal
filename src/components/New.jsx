import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

import Input from '@mui/material/Input';
import { Box} from '@mui/material';
import { Card,CardTitle, CardHeader,CardContent } from '@mui/material';
import image  from '../images/HighlightTip1.png'


export default function Component() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden border-r lg:block">
        <div className="flex h-full flex-col gap-2">
    
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <RouterLink href="#" passHref>
                <a className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
                  <UserIcon className="h-4 w-4" />
                  Profile
                </a>
              </RouterLink>
              <RouterLink href="#" passHref>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <ClipboardIcon className="h-4 w-4" />
                  Resume
                </a>
              </RouterLink>
              <RouterLink href="#" passHref>
                <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <HeartIcon className="h-4 w-4" />
                  Plans
                </a>
              </RouterLink>
            
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="80"
                src={image}
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              />
              <div className="space-y-1">
                <h1 className="font-semibold text-2xl">Alice Johnson</h1>
                <p className="text-gray-500 dark:text-gray-400">UI/UX Designer | 3 years experience</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <Box>Recent Activity</Box>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm">
                  <p>
                    Applied to
                    <RouterLink href="#" passHref>
                      <a className="underline">Senior Product Designer</a>
                    </RouterLink>
                    at Acme Inc
                  </p>
                  <p>
                    Saved job:
                    <RouterLink href="#" passHref>
                      <a className="underline">Senior UI/UX Designer</a>
                    </RouterLink>
                    at Creative Solutions
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Box>Contact</Box>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li>
                      <MailIcon className="h-4 w-4 mr-1 inline-block" />
                      alice.johnson@example.com
                    </li>
                    <li>
                      <PhoneIcon className="h-4 w-4 mr-1 inline-block" />
                      +1 234 567 890
                    </li>
                    <li>
                      <MapPinIcon className="h-4 w-4 mr-1 inline-block" />
                      New York, NY
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Icon components

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

