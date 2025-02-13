import Ember from 'ember';

const pending = 0;
Ember.Test.registerWaiter(() => pending !== 0);

declare const MyDb: {
  hasPendingTransactions(): boolean;
};
Ember.Test.registerWaiter(MyDb, MyDb.hasPendingTransactions);

Ember.Test.promise((resolve) => {
  window.setTimeout(resolve, 500);
});

Ember.Test.registerHelper('boot', (app) => {
  Ember.run(app, app.advanceReadiness);
});

Ember.Test.registerAsyncHelper('boot', (app) => {
  Ember.run(app, app.advanceReadiness);
});

Ember.Test.registerAsyncHelper('waitForPromise', (app, promise) => {
  return new Ember.Test.Promise((resolve) => {
    Ember.Test.adapter.asyncStart();

    promise.then(() => {
      Ember.run.schedule('afterRender', null, resolve);
      Ember.Test.adapter.asyncEnd();
    });
  });
});
