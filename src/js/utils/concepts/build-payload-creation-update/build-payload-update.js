import { processLinks, processGeneral } from './shared';

import {
  processVersionableChanges,
  processDatableChanges,
} from 'js/utils/concepts/notes';
import { VERSIONING } from 'js/constants';
import takeKeys from 'js/utils/take-keys';

//only `isValidated` is not sent
const generalFieldsToKeep = [
  'prefLabelLg1',
  'prefLabelLg2',
  'altLabelLg1',
  'altLabelLg2',
  'creator',
  'created',
  'contributor',
  'disseminationStatus',
  'additionalMaterial',
  'valid',
];

export default function buildPayloadUpdate(versioning, oldConcept, concept) {
  const { notes: oldNotes } = oldConcept;
  const { general: rawGeneral, notes, conceptsWithLinks } = concept;

  const general = processGeneral(rawGeneral, generalFieldsToKeep);
  const links = processLinks(conceptsWithLinks);

  //TODO check if there is no `isValidated` property within general
  return {
    wantToVersionning: versioning === VERSIONING ? true : false,
    ...general, //prefLabelLg1, prefLabelLg2...
    ...links,
    //[{ noteType: 'scopeNoteLg2', content: 'new note'} ...]
    datableNotes: processDatableChanges(oldNotes, notes),
    versionableNotes: processVersionableChanges(oldNotes, notes),
  };
}
