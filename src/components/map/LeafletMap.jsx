'use client'

import { useEffect, useRef } from 'react'

export default function LeafletMap({ mode, users, userLocation, selectedUser, tracking, onUserClick }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const routeLayerRef = useRef(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Load Leaflet dynamically
    import('leaflet').then((L) => {
      // Initialize map
      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current).setView(
          userLocation || [20.5937, 78.9629], // India center as default
          userLocation ? 12 : 5
        )

        // Add tile layer based on mode
        updateTileLayer(map, L, mode)

        mapInstanceRef.current = map
      }
    })

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    import('leaflet').then((L) => {
      updateTileLayer(mapInstanceRef.current, L, mode)
    })
  }, [mode])

  useEffect(() => {
    if (!mapInstanceRef.current || !users.length) return

    import('leaflet').then((L) => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      // Add user location marker (blue)
      if (userLocation) {
        const userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
          radius: 10,
          fillColor: '#2563eb',
          color: '#fff',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapInstanceRef.current)

        userMarker.bindPopup('<b>📍 Your Location</b>')
        markersRef.current.push(userMarker)
      }

      // Add other users markers (green)
      users.forEach(user => {
        const marker = L.circleMarker([user.location.lat, user.location.lng], {
          radius: 8,
          fillColor: '#16a34a',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapInstanceRef.current)

        marker.bindPopup(`
          <div style="text-align: center;">
            <img src="${user.avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-bottom: 8px;" />
            <p style="font-weight: bold; margin: 4px 0;">@${user.username}</p>
            <p style="font-size: 12px; color: #666;">Active ${user.lastActive}</p>
          </div>
        `)

        marker.on('click', () => onUserClick(user))
        markersRef.current.push(marker)
      })
    })
  }, [users, userLocation])

  useEffect(() => {
    if (!mapInstanceRef.current || !tracking) return

    import('leaflet').then((L) => {
      // Remove existing route
      if (routeLayerRef.current) {
        routeLayerRef.current.remove()
      }

      // Draw route line
      const route = L.polyline(
        [
          [tracking.from.lat, tracking.from.lng],
          [tracking.to.lat, tracking.to.lng]
        ],
        {
          color: '#2563eb',
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 10'
        }
      ).addTo(mapInstanceRef.current)

      routeLayerRef.current = route

      // Fit map to show both points
      mapInstanceRef.current.fitBounds(route.getBounds(), { padding: [50, 50] })
    })
  }, [tracking])

  const updateTileLayer = (map, L, mode) => {
    // Remove existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })

    // Add new tile layer
    if (mode === 'satellite') {
      // Satellite view (free tier from Mapbox)
      L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=', {process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        attribution: '© Mapbox © OpenStreetMap',
        maxZoom: 19
      }).addTo(map)
    } else {
      // Street view (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map)
    }
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}
