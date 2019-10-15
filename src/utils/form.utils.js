const prescriptionAlter = (values, payload) => {
    // console.log(state.prescriptions, payload);
    let prescriptionsData = [{}];
    if (values.prescriptions && values.prescriptions[0]) {
        prescriptionsData = [{
            ...values.prescriptions[0],
            routeOfAdministration: payload.routeOfAdministration,
            unit: payload.unit
        }];
    } else {
        prescriptionsData = [{
            routeOfAdministration: payload.routeOfAdministration,
            unit: payload.unit
        }];
    }
    return prescriptionsData;
};

export default prescriptionAlter;

export const validateEmail = (email) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(re.test(email));
    return re.test(email);
}
