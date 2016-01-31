# API Readme

To find callouts near a location and within a maximum distance, form the url of a GET request like so:

```
callout.city/api/callouts?filter[where][geo][near]=<lat>,<lng>&filter[where][geo][maxDistance]=<maxDistance>&filter[limit]=<2>
```

Replace <lat>, <lng>, etc. with the desired values.

*Note*: maxDistance is the distance in miles.
