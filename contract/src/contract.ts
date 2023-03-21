// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, UnorderedSet, initialize } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {

  options = new UnorderedMap<string[]>("options");

  promptSet = new UnorderedSet<string>("promptArray");

  voteArray = new UnorderedMap<number[]>("voteArray");

  userParticipation = new UnorderedMap<string[]>("userParticipation");


@call({})
addOptions({
  prompt, 
  option1, 
  option2, 
  url1, 
  url2
}:{
  prompt : string;
  option1 : string;
  option2 : string;
  url1 : string;
  url2 : string;
}){

this.options.set(prompt,[ option1,url1, option2, url2]);

}
@call({})
initializeVotes({prompt},{prompt : String}){
  this.voteArray.set(prompt, [0,0]);
}

@call({})
addToPromptArray({prompt},{prompt : String}){
  this.promptSet.set(prompt);
}
@call({})
clearPromptArray(){

  this.promptSet.clear();
  this.options.clear();
  this.userParticipation.clear();
  this.voteArray.clear();
  near.log("clearing the votes");

}
@call({})
addVote({prompt, index }:{prompt : string; index: number;}){
  let currentVotes = this.voteArray.get(prompt,{defaultValue:[0,0]});
  currentVotes[index]++;
    this.voteArray.set(prompt, currentVotes);
}
@call({})
recordUser({prompt, user}:{prompt: string; user:string;}){
  let currentArray = this.userParticipation.get(prompt,{defaultValue: []});
  !currentArray.includes(user)?currentArray.push():null;
  this.userParticipation.set(prompt, currentArray);
}
@view({})
getUrl({prompt, name}:{prompt: string; name: string}): string{
  near.log(prompt);
  let optionArray = this.options.get(prompt);
  return optionArray[optionArray.indexOf(name) + 1];
}
@view({})
didParticipate({prompt, user}:{prompt: string, user: string}):boolean{
  let promptUserList: string[] = this.userParticipation.get(prompt, {defaultValue: []});
  return promptUserList.includes(user);
}
@view({})
participationArray({prompt}:{prompt: string}): string[]{
  return this.userParticipation.get(prompt);
}
@view({})
getAllPrompt(): string[]{
  return this.promptSet.toArray();
}
@view({})
getVotes({prompt}:{prompt: string;}): number[]{
  return this.voteArray.get(prompt,{defaultValue: []});
}
@view({})
getOptions({prompt}:{prompt: string;}): string[]{
  let optionArray = this.options.get(prompt,{defaultValue: ["n/a", "n/a", "n/a", "n/a"]});
  return [optionArray[0],optionArray[2]];
}

}
