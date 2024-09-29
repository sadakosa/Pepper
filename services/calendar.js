const fs = require('fs');
const path = require('path');
const { generateId } = require('../utils/common');
const file = path.join(__dirname, '../data/calendar.dat');

// Both will work
const sample1 = {
  start: '2024-10-05 10:00', // timestamp1
  end: '2024-10-05 11:00',   // timestamp2
  eventTitle: 'Team Meeting',
  inviteeEmail: 'team@example.com',
};

const sample2 = '2024-10-06 14:00,2024-10-06 15:00,Client Call,client@example.com';

const calendar = {
  addEvent: async (event) => {
    let eventString;
    
    // Check if the event is already a string
    if (typeof event === 'string') {
      eventString = event; // Use the string directly
    } else if (typeof event === 'object') {
      // If it's an object, format it to the desired format
      eventString = formatEvent(event);
    } else {
      throw new Error('Invalid event format. Must be a string or an object.');
    }
    
    fs.appendFileSync(file, `${generateId()},${eventString}\n`);
  },
  getAll: async () => {
    const data = fs.readFileSync(file, 'utf8');
    if (!data) {
      console.log('No events found');
      return [];
    }
    return parseEvents(data);
  },
  getOne: async (eventId) => {
    const events = await calendar.getAll();
    return events.find(event => event.id === eventId) || null;
  },
  editEvent: async (eventId, updatedEvent) => {
    let events = await calendar.getAll();
    events = events.map(event => {
      if (event.id === eventId) {
        // retain id, update other fields
        return { id: event.id, ...updatedEvent }; 
      }
      return event;
    });
    saveEvents(events);
  },
  deleteEvent: async (eventId) => {
    let events = await calendar.getAll();
    events = events.filter(event => event.id !== eventId);
    saveEvents(events);
  }
};

// Parsing the CSV data into event objects
const parseEvents = (data) => {
  const lines = data.trim().split('\n');
  return lines.map((line) => {
    const [id, start, end, eventTitle, inviteeEmail] = line.split(', ');
    return {
      id,
      start,
      end,
      eventTitle,
      inviteeEmail,
    };
  });
}

// Saving events back to the CSV
const saveEvents = (events) => {
  const data = events.map(event => `${event.id},${event.start},${event.end},${event.eventTitle},${event.inviteeEmail}`).join('\n');
  fs.writeFileSync(file, data);
};

// Formatting an event object to string
const formatEvent = (event) => {
  const { start, end, eventTitle, inviteeEmail } = event;
  return `${start},${end},${eventTitle},${inviteeEmail}`;
};

module.exports = calendar;
