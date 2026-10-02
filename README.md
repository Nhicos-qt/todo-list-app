# To-Do List App

A fully functional, responsive To-Do List web application built with React and Tailwind CSS.

## Features

- **Add Tasks**: Text input field to create new tasks
- **Task Management**: Mark tasks as complete/incomplete with checkboxes
- **Delete Tasks**: Remove individual tasks from the list
- **Clear Completed**: Delete all finished tasks at once
- **Progress Tracking**: View total tasks and completed count
- **Input Validation**: Prevents adding empty tasks
- **Local Storage**: Tasks persist between sessions
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modular Components**: Clean, organized React component structure
- **User Guide**: Built-in instructions for using the app

## Component Structure

- **Header**: App title and branding
- **TaskInput**: Input field and add button
- **TaskList**: Main task list container
- **TaskItem**: Individual task with checkbox and delete button
- **UserGuide**: Instructions and tips section

## Technologies Used

- React (Functional Components, Hooks)
- Tailwind CSS (Responsive Design, Utility Classes)
- JavaScript (ES6+)
- Local Storage API
- Vite (Build Tool)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Deployment

Ready to deploy on Vercel:

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel automatically detects Vite and builds
4. Your app goes live at `https://your-app-name.vercel.app`

## Usage

1. Type a task in the input field
2. Click "Add Task" or press Enter
3. Click the checkbox to mark tasks complete
4. Use "Delete" to remove individual tasks
5. Use "Clear Completed" to remove all finished tasks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
