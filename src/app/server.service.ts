import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServerService {

  baseUrl = 'http://student04.cse.nd.edu:51087/';

  constructor(private http: HttpClient) { }

  getDocById(docId: string) {
    return this.http.get(this.baseUrl + "document/" + docId)
  }

  getDocsByIds(docIds: string[]) {
    let body = { 'doc_ids': docIds }
    return this.http.post(this.baseUrl + "document/", JSON.stringify(body))
  }

  filter(tags: string[]) {
    let body = { 'tags': tags }
    return this.http.post(this.baseUrl + "tags/", JSON.stringify(body));
  }

  getDocContentById(docId: string) {
    return this.http.get(this.baseUrl + "content/" + docId)
  }

  addComment(comment: string, docId: string) {
    let body = { 'comment': comment }
    return this.http.post(this.baseUrl + "comment/" + docId, JSON.stringify(body))
  }

  deleteComment(comment: string, docId: string) {
    let body = { 'comment': comment }
    return this.http.put(this.baseUrl + "comment/" + docId, JSON.stringify(body))
  }

  addTags(tags: string[], docId: string) {
    let body = { 'tags': tags }
    return this.http.put(this.baseUrl + "tags/" + docId, JSON.stringify(body))
  }

  deleteTag(tag: string, docId: string) {
    let body = { 'tag': tag }
    return this.http.post(this.baseUrl + "tags/" + docId, JSON.stringify(body))
  }

  getTags(docId) {
    return this.http.get(this.baseUrl + "tags/" + docId)
  }

  getDocuments() {
    return this.http.get(this.baseUrl + "document/")
  }

}
