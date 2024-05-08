export default [
    {
        id: 'exception-reporter',
        title: 'Exception Reporter',
        description: "Displays a dialog with exception's information when it occurs.",
        notes: [
            "It may not catch every exception.",
            "Don't expect people immediatelly knowing what's wrong by uploading a screenshot of the exception report.",
        ],
        images: [
            'exception-reporter.png',
        ],
    },
    {
        id: 'free-camera',
        title: 'Free Camera',
        description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
        notes: [
            "Press F7 to toggle the menu.",
            "Use your mouse to freely transform the camera.",
        ],
        images: [
            'free-camera-menu.png',
            'free-camera.png',
        ],
    },
    {
        id: 'bully-repellent',
        title: 'Bully Repellent',
        description: "Automatically kicks or mutes a player on the user's blacklist.",
        notes: [
            "Press F7 to toggle the menu.",
            "Players added to the blacklist aren't automatically kicked or muted, you must check either 'Autokick' or 'Automute'.",
            "You cannot add yourself to the list, nor the same player multiple times.",
        ],
        images: [
            'bully-repellent-menu.png',
        ],
    },
    {
        id: 'protection',
        title: 'Protection',
        description: "Replaces a new vehicle's or challenge's ID sent over the network to avoid crashing players.",
        notes: [
            "Press F7 to toggle the menu.",
            "New vehicles and challenges are added to the protection list automatically.",
            "You can individually set the replacement vehicle/challenge, or let it use the fallback vehicle/challenge.",
        ],
        images: [
            'protection-menu.png',
        ],        
    },
];