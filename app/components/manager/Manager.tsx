"use client"

import { useState, useEffect } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUpload from "./FileUpload";
import '../../manager.css';
import { postCorpusName, patchCorpusName } from '@/app/ipcRenderer/corpusEdits';
import { useProjectTitles } from '@/app/context/ProjectsContext';
import { useCorpusMetaData, useCorpusDispatch } from '@/app/context/CorpusContext';

interface SelectableProjectTitle {
    id: number;
    project_name: string;
    isSelected: boolean;
}


const Manager = () => {

    const projectTitles: SelectableProjectTitle[] = useProjectTitles();
    let corpusMetadata = useCorpusMetaData();
    let corpusDispatch = useCorpusDispatch();

    // The purpose of this useEffect is to populate the state of the corpusName from context
    let initialCorpusName = 'Click to name'; // initial state on creating a project
    useEffect(() => {
        initialCorpusName = corpusMetadata.corpus.corpus_name;
    })

    const [editingCorpusName, setEditingCorpusName] = useState<boolean>(false);
    const [corpusName, setCorpusName] = useState<string>(initialCorpusName);

    const handleEditCorpusName = () => {
        setEditingCorpusName(!editingCorpusName);
    }
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setCorpusName(event.target.value);
        if (corpusName.length > 23) {
            setCorpusName((prevName) => prevName.substring(0, 22));
        }
        /**
         * UPDATE THIS - it should not surprise the user!
         */
        if(corpusName.length === 0) {
            setCorpusName((prevName) => "Write something!");
        }
    }
    const updateCorpusName = () => {
        // Get the id of the currently selected project
        const projectId = projectTitles.filter(projectTitle => projectTitle.isSelected === true)[0].id;
        const corpusDetails = {
            corpusName: corpusName,
            projectId: projectId
        };

        // Set the corpus name for this project
        if (corpusMetadata.corpus.corpus_name === '') {
            if(corpusDispatch) {
                corpusDispatch({
                    type: "update-corpus-name", 
                    corpusName: corpusName
                });
                postCorpusName(corpusDetails);
            }
            
        } else {
            // This time we just want to patch the name
            if(corpusDispatch) {
                corpusDispatch({
                    type: "update-corpus-name", 
                    corpusName: corpusName
                });
                patchCorpusName(corpusDetails);
            }
        }
    }

    return (
        <div className = 'manager-container'>
            
            <div className = {`manage-group-area ${``}`}>
                
                <div className = 'corpus-edit-area'>

                    <div className='corpus-title-area'>
                        {
                            editingCorpusName &&
                            <div>
                                <input
                                    className='corpus-name-input'
                                    type='text' 
                                    value={corpusName}
                                    onChange={handleInputChange}
                                />
                                <button 
                                    className='corpus-name-update-button'
                                    type='button'
                                    onClick={() => {
                                        handleEditCorpusName();
                                        updateCorpusName();
                                    }}
                                ><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                        }
                        {
                            !editingCorpusName && 
                            <span 
                                className='corpus-title' 
                                onClick={handleEditCorpusName}
                            >
                                    {corpusName}
                            </span>
                        }
                    </div>
                    
                    <div className='add-group-area'>
                        <button
                            className='add-group-button'
                            type='button'
                        >
                            Add group
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    

                </div>
                <FileUpload />
                <FileUpload />
                <FileUpload />
                <FileUpload />
                
            </div>

            <div>
                <p>This is where you will see info</p>
                <p>Probably somewhere in the middle, related to your corpus</p>
            </div>
        </div>
    );
};

export default Manager;