// loadData

setRequestGetSurveyResponses('ch.suedhang.apps.bdi');

this.dispatch('actionGetCurrentPatient');
this.dispatch('actionGetCurrentPatientStays');
this.dispatch('actionGetSurveyResponses');
this.dispatch('actionGetCurrentUser');
this.dispatch('actionGetClinic');
this.dispatch('actionGetApps');
