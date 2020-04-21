/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Weather, Visibility } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment: " + comment);
  }
  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error("Incorect or missing visibility: " + visibility);
  }
  return visibility;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newDiaryEntry: NewDiaryEntry = {
    weather: parseWeather(object.weather),
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    visibility: parseVisibility(object.visibility),
  };

  return newDiaryEntry;
};

export default toNewDiaryEntry;
