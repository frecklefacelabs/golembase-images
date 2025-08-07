import { Component, OnInit, inject } from "@angular/core"
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { CommonModule } from "@angular/common"

@Component({
    selector: "app-thumbnail-gallery",
    standalone: true,
    // CommonModule is still needed for things like [src] and [alt] bindings
    imports: [CommonModule, HttpClientModule],
    templateUrl: "./thumbnail-gallery.html",
    styleUrls: ["./thumbnail-gallery.css"],
})
export class ThumbnailGalleryComponent implements OnInit {
    // Inject the HttpClient service to make API calls.
    private http = inject(HttpClient)

    // This property will hold the array of image IDs fetched from the backend.
    public thumbnailIds: string[] = []

    // The base URL for your backend API.
    public backendUrl = "http://localhost:3000"

    /**
     * ngOnInit is a lifecycle hook that runs once after the component is initialized.
     * It's the perfect place to fetch initial data.
     */
    ngOnInit(): void {
        this.fetchThumbnailIds()
    }

    /**
     * Fetches the list of thumbnail IDs from the backend API.
     */
    private fetchThumbnailIds(): void {
        const apiUrl = `${this.backendUrl}/thumbnails`

        console.log(`Fetching thumbnails from: ${apiUrl}`)

        this.http.get<string[]>(apiUrl).subscribe({
            next: (ids) => {
                this.thumbnailIds = ids
                console.log(`Successfully fetched ${ids.length} thumbnail IDs.`)
            },
            error: (err) => {
                console.error("Failed to fetch thumbnail IDs:", err)
            },
        })
    }

    /**
     * Handles a click on a thumbnail image.
     * It fetches the parent image ID and navigates to the parent image URL.
     * @param thumbnailId The ID of the thumbnail that was clicked.
     */
    public onImageClick(thumbnailId: string): void {
        const apiUrl = `${this.backendUrl}/parent/${thumbnailId}`
        console.log(`Fetching parent ID for thumbnail: ${thumbnailId}`)

        // Make the API call, expecting a plain text response.
        this.http.get(apiUrl, { responseType: "text" }).subscribe({
            next: (parentId) => {
                console.log(`Received parent ID: ${parentId}. Navigating...`)
                // Navigate the browser to the full-size image URL.
                window.location.href = `${this.backendUrl}/image/${parentId}`
            },
            error: (err) => {
                console.error(
                    `Failed to fetch parent ID for thumbnail ${thumbnailId}:`,
                    err
                )
            },
        })
    }

    /**
     * Handles errors when an image fails to load.
     * @param event The error event from the <img> element.
     */
    public onImageError(event: Event): void {
        const element = event.target as HTMLImageElement
        element.src = "https://placehold.co/150x150/eee/ccc?text=Error"
    }
}
