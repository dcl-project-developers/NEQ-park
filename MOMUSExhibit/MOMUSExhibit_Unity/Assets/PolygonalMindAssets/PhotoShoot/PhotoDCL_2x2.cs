using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class PhotoDCL_2x2 : MonoBehaviour
{
    public GameObject CameraCOG;

    [Header("Set Position")]
    public bool North;
    public bool South;
    public bool East;
    public bool West;
    [Space(4)]
    [Header("Set Rotation")]
    public bool Add90;
    public bool Substract90;
    [Space(4)]
    [Header("Camera Coordinates")]
    public Transform EastPos;
    public Transform SouthPos;
    public Transform WestPos;
    public Transform NorthPos;


    // Start is called before the first frame update
    private void Awake()
    {

        MatchCoordinates();

    }
    void Start()
    {
       
        North = true;

    }

    // Update is called once per frame
    void Update()
    {
        if(North == true || South == true || East == true || West == true )

        {

            MoveCamera();

        }
     
        if (Add90 == true || Substract90 == true)
        {
            RotateCamera();
        }
    }
    void MoveCamera()
    {

        if (North == true)
        {
            CameraCOG.transform.position = NorthPos.position;
            Debug.Log("NorthPos set");
            CameraCOG.transform.eulerAngles = new Vector3(0, 0, 0);
            North = false;
        }
        if (South == true)
        {
            CameraCOG.transform.position = SouthPos.position;
            CameraCOG.transform.eulerAngles = new Vector3(0, 180, 0);

            Debug.Log("SouthPos set");
            South = false;
        }
        if (East == true)
        {
            CameraCOG.transform.position = EastPos.position;
            Debug.Log("EastPos set");
            CameraCOG.transform.eulerAngles = new Vector3(0, 90, 0);
            East = false;
        }
        if (West == true)
        {
            CameraCOG.transform.position = WestPos.position;
            CameraCOG.transform.eulerAngles = new Vector3(0, 270, 0);
            Debug.Log("WestPos set");
            West = false;
        }

    }

    [ContextMenu("Match Coordinates")]
    void MatchCoordinates()
    {
        EastPos = gameObject.transform.Find("PosEast");
        NorthPos = gameObject.transform.Find("PosNorth");
        WestPos = gameObject.transform.Find("PosWest");
        SouthPos = gameObject.transform.Find("PosSouth");
    }

     [ContextMenu("Rotate Camera -90")]
    void RotateCamera()
    {
        if (Add90 == true)
        {
            CameraCOG.GetComponent<Transform>().eulerAngles = new Vector3(+0, CameraCOG.transform.eulerAngles.y + 90, +0);
            Add90 = false;
        }
        else
            CameraCOG.GetComponent<Transform>().eulerAngles = new Vector3(+0, CameraCOG.transform.eulerAngles.y - 90, 0);
        Substract90 = false;
    }
}
