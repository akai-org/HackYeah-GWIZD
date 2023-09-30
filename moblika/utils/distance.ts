import i18n from '../i18n';

export const getDistanceLabel = (
   distance: number,
   longLabel?: boolean
): string =>
   distance > 1.0
      ? i18n.t(`${longLabel ? 'kilometersFromYou' : 'kilometers'}`, {
           distance: distance.toFixed(),
        })
      : i18n.t(`${longLabel ? 'lessThanKilometer' : 'kilometer'}`);

const toRad = (value: number) => {
   return (value * Math.PI) / 180;
};

export const calcDistance = (
   lat1: number,
   lng1: number,
   lat2: number,
   lng2: number
) => {
   var R = 6371; // km
   var dlat = toRad(lat2 - lat1);
   var dlng = toRad(lng2 - lng1);
   var lat1 = toRad(lat1);
   var lat2 = toRad(lat2);

   var a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.sin(dlng / 2) * Math.sin(dlng / 2) * Math.cos(lat1) * Math.cos(lat2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c;
   return d;
};
