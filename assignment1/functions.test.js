const fs = require('fs');
const functions = require('./functions');
const data = fs.readFileSync("NEOWISE_Dataset.json", "utf8");

const parseData = functions.parseData;
const getNeoByIndex = functions.getNeoByIndex;
const getNeoByDesignation = functions.getNeoByDesignation;
const getNeoByClass = functions.getNeoByClass;

// Test with an input of 0 for getNeoByIndex
test ('Input of data and 0, output of first element in data array', () => {
    expect(getNeoByIndex(parseData(data), 0)).toEqual({
                                                        designation: "419880 (2011 AH37)", 
                                                        discovery_date: "2011-01-07T00:00:00.000",
                                                        h_mag: 19.7, 
                                                        i_deg: 9.65, 
                                                        moid_au: 0.035,
                                                        orbit_class: "Apollo", 
                                                        period_yr: 4.06,
                                                        pha: true,
                                                        q_au_1: 0.84,
                                                        q_au_2: 4.26
                                                    });
});

test ('Input of data and "398188 (2010 LE15)", output of element with designation matching "398188 (2010 LE15)"',
    () => {
        expect(getNeoByDesignation(parseData(data), "398188 (2010 LE15)")).toEqual([
            {
              designation: '398188 (2010 LE15)',
              discovery_date: '2010-06-03T00:00:00.000',
              h_mag: 19.5,
              moid_au: 0.024,
              q_au_1: 0.63,
              q_au_2: 1.1,
              period_yr: 0.8,
              i_deg: 13.25,
              pha: true,
              orbit_class: 'Aten'
            }
          ])
    }
)

test ('Input of data and Parabolic Comet, output of element with orbit_class matching Parabolic Comet',
    () => {
        expect(getNeoByClass(parseData(data), "Parabolic Comet")).toEqual([
              {
                designation: 'C/2010 J4 (WISE)',
                discovery_date: '2010-05-12T00:00:00.000',
                moid_au: 0.307,
                q_au_1: 1.09,
                i_deg: 162.3,
                pha: null,
                orbit_class: 'Parabolic Comet'
              },
              {
                designation: 'C/2010 E3 (WISE)',
                discovery_date: '2010-03-05T00:00:00.000',
                moid_au: 1.546,
                q_au_1: 2.27,
                i_deg: 96.48,
                pha: null,
                orbit_class: 'Parabolic Comet'
              }
            ])
    }
)