# API Readme

To find callouts near your location, add the following object to the request body with key `filter`:

```
{
   "where":{
      "geo":{
         "near":[
            lat,
            lng,
         ],
         "maxDistance": maxDistance
      }
   },
   "limit": limit
}
```

Where lat and lng are float values and and maxDistance and limit are integer values.

*Note*: maxDistance is the distance in miles.
