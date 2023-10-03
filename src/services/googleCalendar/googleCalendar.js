import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId: "82284491588-5s9bn6shgbfb4muc2r2d28sq8c05u9kh.apps.googleusercontent.com",
  apiKey: "AIzaSyC4pR20g9P33QzoxmSttCF-K4xQakye3gs",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);


