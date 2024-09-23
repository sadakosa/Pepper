const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/calendar.csv');

const sampleEvent = {
  start: '2021-01-01 12:00',
  end: '2021-01-01 13:00',
  eventTitle: 'Meeting with John Doe',
  inviteeEmail: 'john@example.com',
};

const calendar = {
  addEvent: async (event) => {
    const eventString = formatEvent(event);
    fs.appendFileSync(file, `${generateEventId()},${eventString}\n`);
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
        return { id: event.id, ...updatedEvent }; // retain id, update other fields
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

// Adjust this function to parse the new format
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

// Adjust this function to save the new format
const saveEvents = (events) => {
  const data = events.map(event => `${event.id},${event.start},${event.end},${event.eventTitle},${event.inviteeEmail}`).join('\n');
  fs.writeFileSync(file, data);
};

// Helper function to format the event before saving
const formatEvent = (event) => {
  const { start, end, eventTitle, inviteeEmail } = event;
  return `${start},${end},${eventTitle},${inviteeEmail}`;
};

function generateEventId() {
  return Math.random().toString(36).substring(2, 15);
}

module.exports = calendar;