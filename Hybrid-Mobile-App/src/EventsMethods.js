import React, { Component } from "react";

/**
 *  Format an event for display on the front end
 *
 * @param {Event} event The event to format
 * @returns {Event} The formatted event
 */

function formatevent(event) {
  let formattedEvent = { ...event };
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

const getEvents = async () => {
  const events = await fetch("https://360api.gordon.edu/api/events/25Live/Public");
  return events.map((e) => formatevent(e));
};

const getFilteredEvents = (events, keyword) => {
  const matchesSearch = search(keyword);
  if (search) {
    return events.filter(matchesSearch);
  } else {
    return events;
  }
};

const search = (word) => (event) => {
  const keyword = word.toLowerCase();
    return(
      event.title.toLowerCase().includes(keyword) ||
      event.description.toLowerCase().includes(keyword) ||
      event.organization.toLowerCase().includes(keyword) ||
      event.location.toLowerCase().includes(keyword)
    );
};


const eventMethods = {
  getEvents,
  getFilteredEvents,
}

export default eventMethods;
