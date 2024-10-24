import {
  Users,
  CreditCard,
  UserCheck,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  LinkIcon,
  Settings,
  Trash2,
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal
} from 'lucide-react';

export const userOptions = [
  {
    title: 'Team',
    icon: Users,
    href: '/teams'
  },
  {
    title: 'Billing',
    icon: CreditCard,
    href: '/teams/billing'
  },
  {
    title: 'Profile',
    icon: UserCheck,
    href: '/teams/profile'
  }
];

export const teamIcons = [
  {
    value: 1,
    icon: GalleryVerticalEnd,
    title: 'Gallery Vertical'
  },
  {
    value: 2,
    icon: AudioWaveform,
    title: 'Audio Waveform'
  },
  {
    value: 3,
    icon: Command,
    title: 'Command'
  }
];

export const teamIconMap: {
  [key: number]: React.ComponentType<{ className?: string }>;
} = {
  1: GalleryVerticalEnd,
  2: AudioWaveform,
  3: Command
};

export const projectOption = [
  {
    title: 'Copy Link',
    icon: LinkIcon
  },
  {
    title: 'Edit',
    icon: Settings
  },
  {
    title: 'Delete',
    icon: Trash2
  }
];

export const navMain = [
  {
    title: 'Dashboard',
    url: '/',
    icon: SquareTerminal
  },
  {
    title: 'Settings',
    icon: Settings2,
    items: [
      {
        title: 'General',
        url: '/setting/general'
      },
      {
        title: 'Member',
        url: '/setting/member'
      },
      {
        title: 'Danger',
        url: '/setting/danger'
      }
    ]
  }
];

export const data = {
  navMain: [
    {
      title: 'Users',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'View',
          url: '#'
        },
        {
          title: 'Invite',
          url: '#'
        }
      ]
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#'
        },
        {
          title: 'Explorer',
          url: '#'
        },
        {
          title: 'Quantum',
          url: '#'
        }
      ]
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#'
        },
        {
          title: 'Get Started',
          url: '#'
        },
        {
          title: 'Tutorials',
          url: '#'
        },
        {
          title: 'Changelog',
          url: '#'
        }
      ]
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#'
    },
    {
      name: 'Sales & Marketing',
      url: '#'
    },
    {
      name: 'Travel',
      url: '#'
    }
  ]
};
