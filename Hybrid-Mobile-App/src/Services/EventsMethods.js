import { DateTime } from 'luxon';

// All functions in this file have been taken from the 
// Gordon 360 repo /src/services/events.js file and
// modified to fit their purposes in this project
// https://github.com/gordon-cs/gordon-360-ui/blob/develop/src/services/event.js


/** FROM 360 UI
 *  Fetch all gordon events scheduled after the current date/time
 *
 *  @returns {events} array of future event objects
 */
const getEvents = async () => {
  const result = await fetch("https://360api.gordon.edu/api/events/25Live/Public");
  const eventJson = result.ok ? await result.json() : "";
  const sortedEvents = eventJson.map((e) => formatevent(e)).sort(sortEventsByTime);
  const now = Date.now();
  return sortedEvents
    .filter((e) => new Date(e.Occurrences[0].StartDate).getTime() > now)
    .sort(sortEventsByTime);
};

/** FROM 360 UI
 *  Format an event for display on the front end
 *
 * @param {Event} event The event to format
 * @returns {Event} The formatted event
 */
function formatevent(event) {
  let formattedEvent = { ...event };
	
	if (event.Occurrences?.[0]) {
		const beginTime = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('t');
		const endTime = DateTime.fromISO(event.Occurrences[0].EndDate).toFormat('t');
		formattedEvent.timeRange = `${beginTime} - ${endTime}`;
		formattedEvent.date = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('LLL d, yyyy');
	}
	
  formattedEvent.title = event.Event_Title || event.Event_Name;

  formattedEvent.location = event.Occurrences?.[0]?.Location || 'No Location Listed';
  formattedEvent.organization = event.Organization || 'No Organization Listed';

  if (!formattedEvent.Description) {
    formattedEvent.Description = 'No description available';
  } else {
    // Remove markup from event description.
    formattedEvent.Description = formattedEvent.Description.replace(
      /&(#[0-9]+|[a-zA-Z]+);/g,
      ' ',
    ).replace(/<\/?[^>]+(>|$)/g, ' ');
  }

  return formattedEvent;
}

/**FROM 360 UI
 * Compares two events by the time of their first occurrence
 *
 * @param {Event} a the first event to compare
 * @param {Event} b the second event to compare
 * @returns {int} the sort order of the two events. -1 if a is first, 1 if b is first, 0 otherwise
 */
function sortEventsByTime(a, b) {
  const timeA = a.Occurrences[0].StartDate;
  const timeB = b.Occurrences[0].StartDate;

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
}


/** FROM 360 UI
 *  Get events filtered by a string keyword
 *
 * @param {Events} events The events to filter
 * @param {string} keyword A search string to filter with 
 * @returns {Events} events filtered
 */
const getFilteredEvents = (events, keywords) => {
  const search = (event) => {
      return keywords.some(key =>
        event.title.toLowerCase().includes(key.toLowerCase()) ||
        event.Description.toLowerCase().includes(key.toLowerCase()) ||
        event.organization.toLowerCase().includes(key.toLowerCase()) ||
        event.location.toLowerCase().includes(key.toLowerCase())
      )  
  };      
  
  if (events) {
    return events.filter(search);
  } else {
    return events;
  }
};

const eventMethods = {
  getEvents,
  getFilteredEvents,
}

export default eventMethods;