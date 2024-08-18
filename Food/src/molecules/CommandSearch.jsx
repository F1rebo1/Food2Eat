import React from 'react';
import { Command } from 'cmdk';

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        
        <Command.Group heading="Suggestions">
          <Command.Item>
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <span>Search Emoji</span>
          </Command.Item>
          <Command.Item disabled>
            <span>Calculator</span>
          </Command.Item>
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Settings">
          <Command.Item>
            <span>Profile</span>
            <span className="cmdk-shortcut">⌘P</span>
          </Command.Item>
          <Command.Item>
            <span>Billing</span>
            <span className="cmdk-shortcut">⌘B</span>
          </Command.Item>
          <Command.Item>
            <span>Settings</span>
            <span className="cmdk-shortcut">⌘S</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  );
}

export default CommandDemo;


// import React from 'react';
// import { Command } from 'cmdk'

// const CommandMenu = () => {
//     const [value, setValue] = React.useState('apple');

//   return (
//     <Command label="Command Menu" value={value} onValueChange={setValue}>
//       <Command.Input />
//       <Command.List>
//         <Command.Empty>No results found.</Command.Empty>

//         <Command.Group heading="Letters">
//           <Command.Item>a</Command.Item>
//           <Command.Item>b</Command.Item>
//           <Command.Separator />
//           <Command.Item>c</Command.Item>
//         </Command.Group>
//         <Command.Item>Orange</Command.Item>
//         <Command.Item>Apple</Command.Item>
//       </Command.List>
//     </Command>
//   )
// }

// export default CommandMenu;