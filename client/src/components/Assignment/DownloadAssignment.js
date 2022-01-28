import React, {useState,useEffect} from 'react'
import axios from 'axios';
import download from 'downloadjs';

const DownloadAssignment = ({class_id}) =>{
    const [filesList, setFilesList] = useState([]);


    useEffect(() => {
        const getFilesList = async () => {
          try {
            const { data } = await axios.get(`/class/${class_id}/assignment/getAllFiles`);
            setFilesList(data);
          } catch (error) {
            console.log(error)
          }
        };
    
        getFilesList();
      }, []);

      const downloadFile = async (id,filename,  mimetype) => {
         try {
          const result = await axios.get(`/class/${class_id}/assignment/download/${id}`, {
            responseType: 'blob'
          });
          return download(result.data, filename, mimetype);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.log('Error while downloading file. Try again later');
          }
        } 
      };


    return(
        <>
         <table className="files-table">
        <thead>
          <tr>
            <th>Assignment title</th>
            <th>Name</th>
            <th>Submission date</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, assignment_id,user_id, submission_time,file_name, mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{assignment_id.title}</td>
                  <td className="file-description">{user_id.name}</td>
                  <td>{submission_time}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_name, mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </>
    )
}

export default DownloadAssignment