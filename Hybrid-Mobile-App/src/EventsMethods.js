import React, { Component } from "react";


const getEvents = async () => {
  const result = await fetch("https://360api.gordon.edu/api/events/25Live/Public");
  const eventJson = result.ok ? await result.json() : "";
  const events = eventJson.map((e) => formatevent(e));
  return events;
};

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

const getFilteredEvents = (events, keywords) => {
  const search = (event) => {
    for(let word of keywords) {
      const keyLower = word.toLowerCase();
      return(
        event.title.toLowerCase().includes(keyLower) ||
        event.Description.toLowerCase().includes(keyLower) ||
        event.organization.toLowerCase().includes(keyLower) ||
        event.location.toLowerCase().includes(keyLower)
      );
    }  
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
