if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  if ('windowControlsOverlay' in navigator) {
    navigator.windowControlsOverlay.addEventListener('geometrychange', debounce(e => {
      // Detect if the Window Controls Overlay is visible.
      const isOverlayVisible = navigator.windowControlsOverlay.visible;
  
      // Get the size and position of the title bar area.
      const titleBarRect = e.titlebarAreaRect;
  
      console.log(`The overlay is ${isOverlayVisible ? 'visible' : 'hidden'}, the title bar width is ${titleBarRect.width}px`);
    }, 200));
  }


const notification = new Notification("Bienvenido", {
    body: "Pagina esclusiva de Materiales",
    icon: "/images/icons/icon-72x72.png",
    timeout: 1500000,
    vibrate: [100, 100, 100],
    onClick: function(){
        window.location = "/index.html";
        console.log(this);
    }
});


navigator.serviceWorker.ready
    .then(function (registration) {         
        return registration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    return subscription;
                }

                const vapidPublicKey = "BGWwegGZc1-zNt84TwqXHtPZGS2DS58nZVbCwkIKXbhMI5j0K89a0pIKrNE9TEvjgAfH40M9xwEdp6-bWntxZBo";
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });
        });
    }
);


function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


self.addEventListener('push', function (event) {
    if (Notification.permission === "granted") {
        const notificationText = event.data.text();
        const showNotification = self.registration.showNotification('Notificaciones', {
            body: notificationText,
            icon: '/images/icons/icon-72x72.png'
        });
        event.waitUntil(showNotification);
    }
});

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == 'http://127.0.0.1:8080/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});