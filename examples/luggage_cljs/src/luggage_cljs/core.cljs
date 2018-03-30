(ns luggage-cljs.core
  (:require ["@luggage/core" :refer (DropboxBackend Luggage)]))

(def b (DropboxBackend. "dropbox-api-key-goes-here"))
(def l (Luggage. b))
(def recipes (.collection l "recipes"))

(defn display-recipes
  []
  (-> (.read recipes)
      (.then js/console.log)))

(defn start []
  (js/console.log "start")
  (display-recipes))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))
