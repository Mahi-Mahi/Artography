# Existing API 

The Institute frainçais API is based on the existing ArtFacts API. As such all current API endpoints are valid within the Institute frainçais API. More details can be found at the API Documetation page.

https://github.com/ArtFacts/api/blob/master/README.md

Authentication is identical to the existing API.

https://github.com/ArtFacts/api/blob/master/authentication.md

# New Endpoints

The data required by Institute frainçais is represented by the endpoints described below.

## Artist List

End Point

    https://institut-francais-api.artfacts.net/v0/artist/list

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/artist/list

## Artist's Exhibition Summary

End Point

    https://institut-francais-api.artfacts.net/v0/artist/<artist-id>/exhibitionsSummary

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/artist/80/exhibitionsSummary

## Artist's Exhibitions Details

End Point

    https://institut-francais-api.artfacts.net/v0/artist/<artist-id>/exhibitions

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/artist/80/exhibitions


## Artist's Auction Summary

End Point

    https://institut-francais-api.artfacts.net/v0/artist/<artist-id>/auctionsSummary

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/artist/80/auctionsSummary

## Gallery List

End Point

    https://institut-francais-api.artfacts.net/v0/gallery/list

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/gallery/list
    
## Fairs Attended by Gallery

End Point

    https://institut-francais-api.artfacts.net/v0/gallery/<gallery-id>/fairs

Example

    curl -u user:password https://institut-francais-api.artfacts.net/v0/gallery/7645/fairs
    
    
   

