import { createContext, useContext, useEffect, useReducer, ReactNode, Dispatch } from 'react';

/**
 * TO DO
 */
//import { loadCorpusMetaData } from "../ipcRenderer/corpusEdits";

const CorpusContext = createContext<CorpusMetaData | undefined>(undefined);
const CorpusDispatchContext = createContext<Dispatch<CorpusMetaDataActions> | undefined>(undefined);

type ProjectTitle = {
    id: number;
    project_name: string;
};

type Corpus = {
    id: number;
    corpus_name: string;
};

type SubCorpus = {
    id: number;
    group_name: string;
};

type CorpusFile = {
    id: number;
    file_name: string;
};

type CorpusFilesPerSubCorpus = {
    corpusFiles: CorpusFile[];
    subCorpus: SubCorpus;
};

type CorpusMetaData = {
    projectTitle: ProjectTitle;
    corpus: Corpus;
    files: CorpusFilesPerSubCorpus[];
};

type CorpusMetaDataActions = 
| { type: 'initialize'; corpusMetadata: CorpusMetaData };

interface CorpusProviderProps {
    children: ReactNode;
}

export const CorpusProvider: React.FC<CorpusProviderProps> = ({ children }) => {

    const [corpusMetaData, dispatch] = useReducer<React.Reducer<CorpusMetaData, CorpusMetaDataActions>> (
        corpusMetaDataReducer, // a reducer function
        {
            projectTitle: {
                id: 0,
                project_name: ''
            },
            corpus: {
                id: 0,
                corpus_name: ''
            },
            files: []
        } // initial state

        // Probably won't need a use Effect to update the meta data on app load
        // useEffect(() => {

        // })
    )

    return (
        <CorpusContext.Provider value={corpusMetaData}>
            <CorpusDispatchContext.Provider value={dispatch}>
                {children}
            </CorpusDispatchContext.Provider>
        </CorpusContext.Provider>
    );
};

export const useCorpusMetaData = () => {
    return useContext(CorpusContext);
};

export const useCorpusDispatch = () => {
    return useContext(CorpusDispatchContext);
}

const corpusMetaDataReducer = (corpusMetaData: CorpusMetaData, action: CorpusMetaDataActions): CorpusMetaData => {
    switch (action.type) {
        case 'initialize': {
            return action.corpusMetadata;
        }
        default: {
            return corpusMetaData;
        }
    }
}