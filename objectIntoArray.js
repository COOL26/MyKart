let scrimbaUsers = {
  "00": "sindre@srimba.com",
  "01": "harsh464565@gamil.com",
  "02": "sharma.dabur10@gmail.com",
};

//How to turn that object into an array: "But the array only consists of values and not keys"
Object.values(scrimbaUsers);

//But if you want array of keys:
Object.keys(scrimbaUsers);

//If you want both in the form of 2d arrays:
Object.entries(scrimbaUsers);
